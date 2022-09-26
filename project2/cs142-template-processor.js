class Cs142TemplateProcessor {

    constructor(template) {
        this.template = template;
    }

    fillIn(dictionary) {
        let str = this.template;
        for (let key in dictionary) {
            let re = new RegExp('\\{\\{' + key + '\\}\\}');
            str = str.replace(re, dictionary[key]);
        }
        str = str.replace(new RegExp('\\{\\{\\w+\\}\\}', "g"), "");
        return str;
    }
}

//I rarely say something like this, THIS FUCKING TEST PROGRAM IS A PIECE OF SHIT!