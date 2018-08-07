var fs = require("fs");
var _ = require('lodash');
var Mustache = require('mustache');
var useGravatar = false;

function render(resumeObject) {

	_.each(resumeObject.work, function(w){
		w.startDateYear = w.startDate.substr(0,4);
		if(w.endDate) {
			w.endDateYear = w.endDate.substr(0,4);
		} else {
			w.endDateYear = 'Present'
		}
	});
	_.each(resumeObject.education, function(e){
	    // If the study is complete, then start date is not really relevant, check for existence.
	    if (e.startDate) {
			e.startDateYear = e.startDate.substr(0,4);
			if(e.endDate) {
				e.endDateYear = e.endDate.substr(0,4);
			}  else {
				e.endDateYear = 'Present'
			}
	    } else {
			e.endDateYear = e.endDate.substr(0,4);
	    }
	});

	// Allow interests to have a link to a website
	resumeObject.linkedInterests = [];
	_.each(resumeObject.interests, function(interest){
    	resumeObject.linkedInterests.push({
    		"name": interest.name,
    		"interestWebsiteName": interest.keywords[0] || '',
    		"interestWebsiteUrl": interest.keywords[1] || ''
    	});
	});

	if(resumeObject.basics && resumeObject.basics.email && useGravatar) {
		resumeObject.basics.gravatar = gravatar.url(resumeObject.basics.email, {
                        s: '100',
                        r: 'pg',
                        d: 'mm'
                    });
	}
	resumeObject.profiles = {};

	_.each(resumeObject.basics.profiles, function(profile){
    	resumeObject.profiles[profile.network] = profile.username;
	});
	console.log(resumeObject.profiles);
	var theme = fs.readFileSync(__dirname + '/resume.template', 'utf8');
	var resumeHTML = Mustache.render(theme, resumeObject);


	return resumeHTML;
};
module.exports = {
	render: render
}
