var mongoSvc = require('../services/mongoService');

var index = function(req, res, next) {
	res.render('index');
}

var userList = function(req, res, next) {

	mongoSvc.getUsers(function(err, userDocs) {
		if(err) {
			res.render('error', {"message": err, "error": {"status": 500, "stack": ""}});
		}
		else {
			res.render('userlist', {"userlist": userDocs});	
		}
	})

}

var userDetails = function(req, res, next) {

	mongoSvc.getUserDetail(req.params.id, function(err, userDoc) {
		if(err) {
			res.render('error', {"message": err, "error": {"status": 500, "stack": ""}});
		}
		else {
			res.render('userdetail', {"user": userDoc});	
		}
	})

}

var newUser = function(req, res, next) {
	res.render('newuser');
}

var newUserPost = function(req, res, next) {
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
}

var deleteUserPost = function(req, res, next) {

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

}

module.exports = {
	index: index,
	userList: userList,
	userDetails: userDetails,
	newUser: newUser,
	newUserPost: newUserPost,
	deleteUserPost: deleteUserPost
};
