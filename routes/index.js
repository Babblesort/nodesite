var mongoSvc = require('../services/mongoService');

exports.index = function(req, res, next) {
	res.render('index');
};

exports.userList = function(req, res, next) {

	mongoSvc.getUsers(function(err, userDocs) {
		if(err) {
			res.render('error', {"message": err, "error": {"status": 500, "stack": ""}});
		}
		else {
			res.render('userlist', {"userlist": userDocs});	
		}
	})

};

exports.userDetails = function(req, res, next) {

	mongoSvc.getUserDetail(req.params.id, function(err, userDoc) {
		if(err) {
			res.render('error', {"message": err, "error": {"status": 500, "stack": ""}});
		}
		else {
			res.render('userdetail', {"user": userDoc});	
		}
	})

};

exports.newUser = function(req, res, next) {
	res.render('newuser');
};

exports.newUserPost = function(req, res, next) {
	var name = req.body.username;
	var email = req.body.useremail;

	mongoSvc.addUser(name, email, function(err, redirectUrl) {
		if(err) {
			res.render('error', {"message": err, "error": {"status": 500, "stack": ""}});
		}
		else {
			res.location(redirectUrl);
			res.redirect(redirectUrl);
		}
	})
};

exports.deleteUserPost = function(req, res, next) {

	mongoSvc.deleteUser(req.params.id, function(err) {
		if(err) {
			res.render('error', {"message": err, "error": {"status": 500, "stack": ""}});
		}
		else {
			var redirectUrl = "/userlist";
			res.location(redirectUrl);
			res.redirect(redirectUrl);
		}
	})

};
