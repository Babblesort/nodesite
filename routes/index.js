var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res) {
	res.render('helloworld', { title: 'Hello World!'})
});

router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{}, function(e, docs) {
		res.render('userlist', {"userlist": docs});
	});
});

router.get('/newuser', function(req, res) {
	res.render('newuser', { title: 'Add New User'});
});

router.post('/newuser', function(req, res) {

	var name = req.body.username;
	var email = req.body.useremail;

	console.log("New user name: " + name);
	console.log("New user email: " + email);

	var db = req.db;
	var collection = db.get('usercollection');

	collection.insert( {
		"username": name,
		"email": email
	}, function (err, doc) {
		if (err) {
			res.send("Database write error...");
		} else {
			res.location("userlist");
			res.redirect("userlist");
		}
	});
}); 


module.exports = router;
