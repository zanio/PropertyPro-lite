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
				
				expect(res.status).to.equal(404);
				done();
			});
	});

	it('it should return not found advert because search query value does not exist ', (done) => {
		chai.request(app)
			.get('/api/v1/property-advert/search?type=fhfd')
			.end((err, res) => {
					expect(res.body.data.length).to.equal(0);
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
			.set('Authorization','bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImhmZmZkZmRmIiwibGFzdF9uYW1lIjoiZmVrbGl4IiwiZW1haWwiOiJjbGluZ3RvbmV5aXR1b3lvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiYWRkcmVzcyI6ImJsb2NrIDE5OSBmbGF0IDQiLCJwaG9uZV9udW1iZXIiOiIwODAxMjM0MjQ1OSIsImdlbmRlciI6Im1hbGUiLCJpc19BZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTk3NjY0MH0.P5L7HTKcofHiElkLA86hNSPMl0yxRgEllyJgrYaIphk')
			.end((err, res) => {
				expect(res.status).to.equal(200);
				done();
			});
	});

     
});

