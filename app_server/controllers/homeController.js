"use strict";
//disable-next-line
module.exports.home = function (req, res) {
	res.render("index", { title: "volStory API | Beta" });
};
