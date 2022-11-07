/* jshint node: true */

/*
 * This builds on the webServer of previous projects in that it exports the current
 * directory via webserver listing on a hard code (see portno below) port. It also
 * establishes a connection to the MongoDB named 'cs142project6'.
 *
 * To start the webserver run the command:
 *    node webServer.js
 *
 * Note that anyone able to connect to localhost:portNo will be able to fetch any file accessible
 * to the current user in the current directory or any of its children.
 *
 * This webServer exports the following URLs:
 * /              -  Returns a text status message.  Good for testing web server running.
 * /test          - (Same as /test/info)
 * /test/info     -  Returns the SchemaInfo object from the database (JSON format).  Good
 *                   for testing database connectivity.
 * /test/counts   -  Returns the population counts of the cs142 collections in the database.
 *                   Format is a JSON object with properties being the collection name and
 *                   the values being the counts.
 *
 * The following URLs need to be changed to fetch there reply values from the database.
 * /user/list     -  Returns an array containing all the User objects from the database.
 *                   (JSON format)
 * /user/:id      -  Returns the User object with the _id of id. (JSON format).
 * /photosOfUser/:id' - Returns an array with all the photos of the User (id). Each photo
 *                      should have all the Comments on the Photo (JSON format)
 *
 */

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const session = require('express-session');

const bodyParser = require('body-parser');

const multer = require('multer');

var cors = require('cors');

var async = require('async');

var express = require('express');

// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
var Photo = require('./schema/photo.js');
var SchemaInfo = require('./schema/schemaInfo.js');

// XXX - Your submission should work without this line. Comment out or delete this line for tests and before submission!

mongoose.connect('mongodb://localhost/cs142project6', { useNewUrlParser: true, useUnifiedTopology: true });

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
var app = express();
app.use(express.static(__dirname));
app.use(cors({ origin: '*' }));
app.use(session({secret: 'secretKey', resave: false, saveUninitialized: false}));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});

/*
 * Use express to handle argument passing in the URL.  This .get will cause express
 * To accept URLs with /test/<something> and return the something in request.params.p1
 * If implement the get as follows:
 * /test or /test/info - Return the SchemaInfo object of the database in JSON format. This
 *                       is good for testing connectivity with  MongoDB.
 * /test/counts - Return an object with the counts of the different collections in JSON format
 */
app.get('/test/:p1', function (request, response) {
    // Express parses the ":p1" from the URL and returns it in the request.params objects.
    var param = request.params.p1 || 'info';

    if (param === 'info') {
        // Fetch the SchemaInfo. There should only one of them. The query of {} will match it.
        SchemaInfo.find({}, function (err, info) {
            if (err) {
                // Query returned an error.  We pass it back to the browser with an Internal Service
                // Error (500) error code.
                console.error('Doing /user/info error:', err);
                response.status(500).send(JSON.stringify(err));
                return;
            }
            if (info.length === 0) {
                // Query didn't return an error but didn't find the SchemaInfo object - This
                // is also an internal error return.
                response.status(500).send('Missing SchemaInfo');
                return;
            }

            // We got the object - return it in JSON format.
            //console.log('SchemaInfo', info[0]);
            response.end(JSON.stringify(info[0]));
        });
    } else if (param === 'counts') {
        // In order to return the counts of all the collections we need to do an async
        // call to each collections. That is tricky to do so we use the async package
        // do the work.  We put the collections into array and use async.each to
        // do each .count() query.
        var collections = [
            {name: 'user', collection: User},
            {name: 'photo', collection: Photo},
            {name: 'schemaInfo', collection: SchemaInfo}
        ];
        async.each(collections, function (col, done_callback) {
            col.collection.countDocuments({}, function (err, count) {
                col.count = count;
                done_callback(err);
            });
        }, function (err) {
            if (err) {
                response.status(500).send(JSON.stringify(err));
            } else {
                var obj = {};
                for (var i = 0; i < collections.length; i++) {
                    obj[collections[i].name] = collections[i].count;
                }
                response.end(JSON.stringify(obj));

            }
        });
    } else {
        // If we know understand the parameter we return a (Bad Parameter) (400) status.
        response.status(400).send('Bad param ' + param);
    }
});

/*
 * URL /user/list - Return all the User object.
 */
app.get('/user/list', function (request, response) {
    if ( !request.session.user_id ) {
        response.status(401).send('Accessed only by users');
        return;
    }
    User.find((error, users) => {
        if (error) response.status(500).send(error);
        response.status(200).send(users);
    })
    //response.status(200).send(cs142models.userListModel());
});

/*
 * URL /user/:id - Return the information for User (id)
 */
app.get('/user/:id', function (request, response) {
    if ( !request.session.user_id ) {
        response.status(401).send('Accessed only by users');
        return;
    }
    var id = request.params.id.slice(1);
    User.findOne({_id: id}, (error, user) => {
        if (error || !user) response.status(400).send(error);
        response.status(200).send(user);
    });
    /*
    var user = cs142models.userModel(id);
    if (user === null) {
        console.log('User with _id:' + id + ' not found.');
        response.status(400).send('Not found');
        return;
    }
    response.status(200).send(user);
    */
});

/*
 * URL /photosOfUser/:id - Return the Photos for User (id)
 */
app.get('/photosOfUser/:id', function (request, response) {
    if ( !request.session.user_id ) {
        response.status(401).send('Accessed only by users');
        return;
    }
    var id = request.params.id.slice(1);
    Photo.find({user_id: id}, (err, photos) => {
        if (err) {
            console.log('Photos for user with _id:' + id + ' not found.');
            response.status(400).send('Not found');
            return;
        }
        let newPhotos = JSON.parse(JSON.stringify(photos));
        async.eachOf(newPhotos, function(photo, i, callback) {
            delete photo.__v;
            async.eachOf(photo.comments, function(com, i, callback2) {
                let the_user = User.findOne({_id: com.user_id});
                the_user.then((user) => {
                    let {_id, first_name, last_name} = user;
                    photo.comments[i] = {
                        comment: com.comment,
                        date_time: com.date_time,
                        _id: com._id,
                        user: {
                            _id: _id,
                            first_name: first_name,
                            last_name: last_name
                        }
                    }
                    callback2();
                });
            }, (err) => {
                if (err) {
                    console.log('error occured');
                } 
                newPhotos[i] = photo;
                callback();
            })
        }, function (err) {
            if (!err) {
                response.status(200).send(newPhotos);
            }
        });
    });
    /*
    var photos = cs142models.photoOfUserModel(id);
    if (photos.length === 0) {
        console.log('Photos for user with _id:' + id + ' not found.');
        response.status(400).send('Not found');
        return;
    }
    response.status(200).send(photos);
    */
});

app.post('/admin/login', (req, res) => {
    const login_name = req.body.login_name;
    const password = req.body.password;
    User.findOne({ login_name: login_name}, (err, user) => {
        if ( err || !user ) {
            console.log('User not found');
            res.status(400).send('User not found');
            return;
        }
        /*
        if ( user.password !== password ) {
            console.log('Password wrong');
            res.status(401).send('Password wrong');
            return;
        }
        */
        console.log('\nlogin success!\n');
        req.session.login_name = user.login_name;
        req.session.password = password;
        req.session.user_id = user._id;
        req.session.user = user;
        req.session.cookie.originalMaxAge = 1000000000000000;
        req.session.cookie.reSave = true;
        let { _id, first_name, last_name, login_name } = user;
        let newUser = { _id, first_name, last_name, login_name };
        res.status(200).send(newUser);
    });
});

app.post('/admin/logout', (req, res) => {
    req.session.destroy(err => {
        if ( err ) {
            res.status(400).send('failed to logout');
        }
        res.status(200).send('logout successful');
    });
});

app.post('/commentsOfPhoto/:photo_id', (req, res) => {
    if ( !req.body.comment ) {
        res.status(400).send('Comment is empty');
    }
    const commentText = req.body.comment;
    const photo_id = req.body.photo_id;
    const date_time = new Date().toISOString();
    const user = req.session.user;
    
    Photo.findOne({ _id: photo_id }, (err, photo) => {
        if (err) {
            res.status(400).send('photo not found');
            return;
        }
        photo.comments = photo.comments.concat([
            {
                comment: commentText,
                date_time: date_time,
                user_id: user._id,
            }
        ]);
        photo.save();
        res.status(200).send('comment successful');
    })
});

app.post('/photos/new', (req, res) => {
    const user = req.session.user;
    const time = new Date().toISOString();
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
