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
			.set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJHAzVk5XTkFNTFcuSTRZVWZ3NDlkVWVxRG5WZDg1S1BXUHpGalk4YmFVc0tRRHJWaEpuOURxIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImRkZiIsImxhc3RfbmFtZSI6InZkc3ZkIiwiZW1haWwiOiJhZGV3YWxlLm9sYW95b0B5YWhvby5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRwM1ZOV05BTUxXLkk0WVVmdzQ5ZFVlcURuVmQ4NUtQV1B6RmpZOGJhVXNLUURyVmhKbjlEcSIsImFkZHJlc3MiOiJzZmZmIiwicGhvbmVfbnVtYmVyIjoiMDkwMTIzNDUzMjEiLCJnZW5kZXIiOiJtYWxlIiwiaXNfQWRtaW4iOnRydWV9LCJpYXQiOjE1NjE1NjM2MTV9.6ln1TUdyMqRJIfxq-WDjq-D8h-wGinH-ffLnWb86YYQ')
			.end((err, res) => {
				expect(res.status).to.equal(200);
				done();
			});
	});

     
});

