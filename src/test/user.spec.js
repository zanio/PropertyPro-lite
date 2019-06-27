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
			phone_number:'09012343212'
		};
  
		chai.request(app)
			.post('/api/v1/auth/register')
			.send(body)
			.end((err, res) => {
				expect(res.body.data).to.have.property('email');
				expect(res.body.data).to.have.property('first_name');
				expect(res.body.data).to.have.property('last_name');
				expect(res.body.data).to.have.property('password');
				expect(res.body.data).to.have.property('id');
				expect(res.body.data).to.have.property('address');
				expect(res.body.data).to.have.property('gender');
				expect(res.body.data).to.have.property('phone_number');
				expect(res.body.status).to.equal(200);
				expect(res.body).to.be.a('object');
				done();
			});
	});

    
     
});

