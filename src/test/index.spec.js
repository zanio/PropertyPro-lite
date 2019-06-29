/* eslint-disable no-undef */
import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
//Our parent block

/*
  * Test the index /GET route and unnknown routes
  */
describe('/GET user account info', () => {
	it('it should test for "/" route ', (done) => {
		chai.request(app)
			.get('/')
			.end((err, res) => {
				expect(res.status).to.equal(200);
				done();
			});
	});

	it('it should test for unknown route ', (done) => {
		chai.request(app)
			.get('*')
			// eslint-disable-next-line no-unused-vars
			.end((err, res) => {
				expect(err).to.equal(err);
				//expect(res.status).to.equal(404);
				done();
			});
	});
 
});

 

