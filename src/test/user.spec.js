/* eslint-disable no-undef */
import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';



//https://dev.to/asciidev/testing-a-nodeexpress-application-with-mocha--chai-4lho
chai.use(chaiHttp);
//Our parent block

/*
  * Test the /POST route
  */
describe('/POST SIGNUP ROUTES', () => {
	it('it should register new user ', (done) => {
		const body = {
			email: 'davephenom@gmail.com',
			first_name: 'Aniefiok',
			last_name: 'Akpan',
			password: 'jhfdcthjk24r44',
			address: '12, ifelodun',
			gender: 'male',
			is_admin: '1',
		};
  
		chai.request(app)
			.post('/api/v1/register')
			.send(body)
			.end((err, res) => {
				expect(res.body.status).to.equal(200);
				expect(res.body).to.be.a('object');
				expect(res.body.data).to.have.property('id');
				done();
			});
	});

    
     
});

