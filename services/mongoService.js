var mongo = require('mongodb');
var monk = require('monk');
var mongoConfig = require('../config/mongo');

var db = monk(mongoConfig.url);
var collection = db.get('usercollection');

var getUsers = function(callback) {

	collection.find({},{}, function(e, docs) {
		if(e) {
			callback('there was an error', "");
		} else {
			callback("", docs);
		}
	});
}

var getUserDetail = function(userId, callback) {

	collection.findOne({"_id": userId},{}, function(e, doc) {
		if(e) {
			callback('there was an error', "");
		} else {
			callback("", doc);
		}
	});
}

var addUser = function(name, email, callback) {

	collection.insert({"username": name, "email": email}, function (err, doc) {
		if (err) {
			callback('there was an error', "");
		} else {
			callback("", "userdetails/" + doc._id)
		}
	});
}

var deleteUser = function(userId, callback) {

	collection.remove({"_id": userId}, function(err){
		if (err) {
			callback('there was an error');
		} else {
			callback("");
		}
    });	

}

module.exports = {
	getUsers: getUsers,
	getUserDetail: getUserDetail,
	addUser: addUser,
	deleteUser: deleteUser
};

