var Promise = require("Promise");

/**
  * FetchModel - Fetch a model from the web server.
  *     url - string - The URL to issue the GET request.
  * Returns: a Promise that should be filled
  * with the response of the GET request parsed
  * as a JSON object and returned in the property
  * named "data" of an object.
  * If the requests has an error the promise should be
  * rejected with an object contain the properties:
  *    status:  The HTTP response status
  *    statusText:  The statusText from the xhr request
  *
*/

function fetchModel(url) {
  return new Promise(function(resolve, reject) {
      url = 'http://localhost:3000' + url;
      console.log(url);
      let request = new XMLHttpRequest();
      request.open('GET', url);
      request.send();
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
            resolve({ data: JSON.parse(request.responseText)});
          } else {
            reject({ status: request.status, statusText: request.responseText})
          }
        }
      }
  });
}

export default fetchModel;
