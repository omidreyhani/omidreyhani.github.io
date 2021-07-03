resume = require('./resume.json');
skillsString = resume.skills.flatMap(x=> x.keywords).join(', ')

console.log(skillsString)