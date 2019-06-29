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
describe('/POST User', () => {

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
				expect(res.body.data).to.have.property('is_Admin').equal(false);
				expect(res.body.status).to.equal(200);

				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should return email already in use ', (done) => {
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
				
				expect(res.body.status).to.equal(403);

				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should return phone number can only be 11 digits ', (done) => {
		const body = {
			email: 'davephenom@gmail.com',
			first_name: 'Aniefiok',
			last_name: 'Akpan',
			password: 'jhfdcthjk24r44',
			address: '12, ifelodun',
			gender: 'male',
			phone_number:'090143212'
		};
  
		chai.request(app)
			.post('/api/v1/auth/register')
			.send(body)
			.end((err, res) => {
				expect(res.body.status).to.equal(404);

				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should login existing user ', (done) => {
		const body = {
			email: 'davephenom@gmail.com',
			password: 'jhfdcthjk24r44',
			
		};
  
		chai.request(app)
			.post('/api/v1/auth/login')
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
				expect(res.body.data).to.have.property('token');
				expect(res.body.status).to.equal(200);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should return password  does not match ', (done) => {
		const body = {
			email: 'davephenom@gmail.com',
			password: 'jhfthjk24r44',
			
		};
  
		chai.request(app)
			.post('/api/v1/auth/login')
			.send(body)
			.end((err, res) => {
				expect(res.body.status).to.equal(403);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should return all field required ', (done) => {
		const body = {
			email: 'davephenom@gmail.com',
			password: 'jhfthjk24r44',
			
		};
  
		chai.request(app)
			.post('/api/v1/auth/register')
			.send(body)
			.end((err, res) => {
				expect(res.body.status).to.equal(402);
				expect(res.body).to.be.a('object');
				done();
			});
	});


	it('it should return first_name and last_name field can only be letter ', (done) => {
		const body = {
			email: 'davephenom@gmail.com',
			first_name: 'An4iefiok',
			last_name: 'Akp34an',
			password: 'jhfdcthjk24r44',
			address: '12, ifelodun',
			gender: 'male',
			phone_number:'09012343212'
		};
  
		chai.request(app)
			.post('/api/v1/auth/register')
			.send(body)
			.end((err, res) => {
				expect(res.body.status).to.equal(403);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should return invalid email ', (done) => {
		const body = {
			email: 'davephenomgmail.com',
			password: 'jhfdcthjk24r44',
			
		};
  
		chai.request(app)
			.post('/api/v1/auth/login')
			.send(body)
			.end((err, res) => {
				expect(res.body.status).to.equal(402);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should register user as admin ', (done) => {
		const body = {
			email: 'akp.ani@yahoo.com',
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
				expect(res.body.data).to.have.property('is_Admin').equal(true);
				expect(res.body.status).to.equal(200);
				expect(res.body).to.be.a('object');
				done();
			});
	});

    
     
});

