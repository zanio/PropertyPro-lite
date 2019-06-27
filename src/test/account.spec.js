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
			.set('Authorization','bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJENGcU1TTUdybEVYazBQZ2ZsREhQSHVYeVI1RkNBaE1LOUZLaEFHM1BKVDF1TU9MNjV5dXdHIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImRkZiIsImxhc3RfbmFtZSI6InZkc3ZkIiwiZW1haWwiOiJhZGV3YWxlLm9sYW95b0B5YWhvby5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRDRnFNU01HcmxFWGswUGdmbERIUEh1WHlSNUZDQWhNSzlGS2hBRzNQSlQxdU1PTDY1eXV3RyIsImFkZHJlc3MiOiJzZmZmIiwicGhvbmVfbnVtYmVyIjoiMDkwMTIzNDUzMjEiLCJnZW5kZXIiOiJtYWxlIiwiaXNfQWRtaW4iOnRydWV9LCJpYXQiOjE1NjE2MjU4ODl9.Tn5VJbvjwxuUuXTskV7HVWvtAb0nOfBkPO9RlYL2PFM')
			.end((err, res) => {
				expect(res.status).to.equal(200);
				done();
			});
	});

     
});

