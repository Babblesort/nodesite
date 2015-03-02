var request = require('supertest');
var expect = require('expect.js');

var app = require('../app.js');

describe('GET index works', function() {

	it('Retrieves HTML for site root', function(done) {
		request(app)
			.get('/')
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(200, done);
	});

});

describe('GET userlist works', function() {

	it('Retrieves HTML for /userlist', function(done) {
		request(app)
			.get('/userlist')
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(200, done);
	});

});

describe('GET userdetails works for known user', function() {

	it('Retrieves HTML for /userlist', function(done) {
		request(app)
			.get('/userdetails/54ed3f542bf78e8ea31e57b5')
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(200, done);
	});

});

describe('GET userdetails for unknown user return 500', function() {

	it('Retrieves HTML for /userlist', function(done) {
		request(app)
			.get('/userdetails/99999999999')
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(500, done);
	});

});

describe('GET newuser works', function() {

	it('Retrieves HTML for /newuser', function(done) {
		request(app)
			.get('/userlist')
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(200, done);
	});

});

// app.post('/newuser', routes.newUserPost);
// app.post('/deleteuser/:id', routes.deleteUserPost);

