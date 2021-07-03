const fileName = './resume.json';
const file = require(fileName);
 
skillsString = file.skills.flatMap(x=> x.keywords).join(', ')


const fs = require('fs');
   
file.basics.summary = file.basics["summary-short"] + skillsString ;
    
fs.writeFile(fileName, JSON.stringify(file,null,2), function writeJSON(err) {
  if (err) return console.log(err);
  console.log('writing to ' + fileName);
});
