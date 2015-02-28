exports.index = function(req, res, next) {
	res.render('index');
};

exports.userList = function(req, res, next) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{}, function(e, docs) {
		res.render('userlist', {"userlist": docs});
	});
};

exports.userDetails = function(req, res, next) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.findOne({"_id": req.params.id},{}, function(e, docs) {
		res.render('userdetail', {"user": docs});
	});
};

exports.newUser = function(req, res, next) {
	res.render('newuser');
};

exports.newUserPost = function(req, res, next) {
	var name = req.body.username;
	var email = req.body.useremail;

	var db = req.db;
	var collection = db.get('usercollection');

	collection.insert({"username": name, "email": email}, function (err, doc) {
		if (err) {
			res.send("Database write error...");
		} else {
			var redirectUrl = "userdetails/" + doc._id;
			res.location(redirectUrl);
			res.redirect(redirectUrl);
		}
	});
};

exports.deleteUserPost = function(req, res, next) {

	var db = req.db;
	var collection = db.get('usercollection');

	collection.remove({"_id": req.params.id}, function(err, removed){
		if(!err) {
			var redirectUrl = "/userlist";
			res.location(redirectUrl);
			res.redirect(redirectUrl);
		}
    });	
};
