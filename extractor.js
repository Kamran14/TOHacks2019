
const jsonfile = require('jsonfile')
const ResumeParser = require('resume-parser');

function fileToJSON(fileName) {
    let promise = new Promise((resolve, reject) => {
        ResumeParser.parseResumeFile('./files/' + fileName, './files/compiled')
        .then(fileName => {
            jsonfile.readFile('./files/compiled/' + fileName + '.json')
            .then(read => {
                console.log("damn it actually worked" + JSON.stringify(read));
                resolve(read);
                
                //res.send(JSON.stringify(read["education"] )); //Sends education & projects related stuff
            })
            .catch(error => console.error(error))
        })
        .catch(error => {
            console.error(error);
        });
    })

    return promise;
}


module.exports.fileToJSON = fileToJSON;