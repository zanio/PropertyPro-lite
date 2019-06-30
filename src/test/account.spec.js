/* eslint-disable no-undef */
import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';



//https://dev.to/asciidev/testing-a-nodeexpress-application-with-mocha--chai-4lho
chai.use(chaiHttp);
//Our parent block

/*
  * Test the /GET route
  */
describe('/GET user account info', () => {

	it('it should return no property advert created yet ', (done) => {
		chai.request(app)
			.get('/api/v1/property-advert')
			.end((err, res) => {
				console.log(res.status)
				expect(res.status).to.equal(404);
				done();
			});
	});

	it('it should GET unauthenticated user ', (done) => {
		chai.request(app)
			.get('/api/v1/auth/my-account/*')
			.end((err, res) => {
				expect(res.status).to.equal(401);
				done();
			});
	});

	it('it should GET authenticated user ', (done) => {
		chai.request(app)
			.get('/api/v1/auth/my-account/*')
			.set('Authorization','bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJFZBa01LVXVtaEdLWUxkbEZkc0lwVS54aS5mMGdSbnNwMTY1WXJCVUd4SUZsUmQvR1VpTFhLIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6Im11c2EiLCJsYXN0X25hbWUiOiJmZWtsZ2dpeCIsImVtYWlsIjoiZGFiY2JnZHlAYWhvby5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWQWtNS1V1bWhHS1lMZGxGZHNJcFUueGkuZjBnUm5zcDE2NVlyQlVHeElGbFJkL0dVaUxYSyIsImFkZHJlc3MiOiJibG9jayAxOTkgZmxhdCA0IiwicGhvbmVfbnVtYmVyIjoiMDkwODc4NTY3ODQiLCJnZW5kZXIiOiJtYWxlIiwiaXNfQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTYxNzc3NTQ1fQ.2rYG5nfwuB5FWXeq1cfu_DJKIfiDWx8B4LjjrlrCtkg')
			.end((err, res) => {
				expect(res.status).to.equal(200);
				done();
			});
	});

     
});

