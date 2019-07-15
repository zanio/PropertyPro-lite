/* eslint-disable no-undef */
import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../app';
import {query} from '../db/index';


let request;
let token;
let userId;


chai.use(chaiHttp);
chai.use(sinonChai);


/*
  * Test the /POST route
  */
describe('/Auth User', () => {

	before(async () => {
		request = chai.request(app).keepOpen();
	  });

	  afterEach(() => sinon.restore());

	  after(async () => {
		const query = 'DELETE FROM users WHERE id = $1';
		await query(query, [userId]);
		request.close();
	  });

	  describe('SIGNUP ROUTE', () => {
		describe('SIGNUP SUCCESSFULLY', () => {
		  it('should have a status of 201', async () => {
			const body = {
			  email: 'segunogundipe2000@yahoo.com',
			  first_name: 'Segun',
			  last_name: 'Ogundipe',
			  password: 'qwertyuiop1234',
			  address: '12 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
			  phone_number:'09012343212',
			  
			};
	
			const response = await request.post('/api/v1/auth/signup').send(body);
			token = response.body.data.token;
			userId = response.body.data.id;
			expect(response.body.status).to.equal(201);
			expect(response.body).to.be.a('object');
		  }).timeout(0);
		});

	it('it should register new user ', (done) => {
		const body = {
			email: 'davephenom@gmail.com',
			first_name: 'Aniefiok',
			last_name: 'Akpan',
			password: 'jhfdcthjk24r44',
			address: '12, ifelodun',
			phone_number:'09012343212',
		};
  
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(body)
			.end((err, res) => {
				

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
			.post('/api/v1/auth/signup')
			.send(body)
			.end((err, res) => {
				
				expect(res.body.status).to.equal(409);

				expect(res.body).to.be.a('object');
				done();
			});
	});

	

	it('it should signin existing user ', (done) => {
		const body = {
			email: 'davephenom@gmail.com',
			password: 'jhfdcthjk24r44',
			
		};
  
		chai.request(app)
			.post('/api/v1/auth/signin')
			.send(body)
			.end((err, res) => {
				expect(res.body.data).to.have.property('email');
				expect(res.body.data).to.have.property('first_name');
				expect(res.body.data).to.have.property('last_name');
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
	it('it should not sign user because email does not exist ', (done) => {
		const body = {
			email: 'davephnenom@gmail.com',
			password: 'jhfdcthjk24r44',
			
		};
  
		chai.request(app)
			.post('/api/v1/auth/signin')
			.send(body)
			.end((err, res) => {
				
				expect(res.body.status).to.equal(403);
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
			.post('/api/v1/auth/signin')
			.send(body)
			.end((err, res) => {
				expect(res.body.status).to.equal(422);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should return all field required ', (done) => {
		const body = {
			email: 'davephenom@gmail.com',
			password: 'jhfthjk24r44',
			phone_number:'09012343212'
			
		};
  
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(body)
			.end((err, res) => {
				expect(res.body.status).to.equal(400);
				expect(res.body).to.be.a('object');
				done();
			});
	});


	

	it('it should return invalid email ', (done) => {
		const body = {
			email: 'davephenomgmail.com',
			first_name: 'Aniefiok',
			last_name: 'Akpan',
			password: 'jhfdcthjk24r44',
			address: '12, ifelodun',
			gender: 'male',
			phone_number:'09012343212'
			
		};
  
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(body)
			.end((err, res) => {
				expect(res.body.status).to.equal(409);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should return number cannot be more than 13 digits', (done) => {
		const body = {
			email: 'davephenom@gmail.com',
			first_name: 'Aniefiok',
			last_name: 'Akpan',
			password: 'jhfdcthjk24r44',
			address: '12, ifelodun',
			gender: 'male',
			phone_number:'09012367843212'
			
		};
  
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(body)
			.end((err, res) => {
				expect(res.body.status).to.equal(422);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should return invalid email during signin ', (done) => {
		const body = {
			email: 'davephenomgmail.com',
			
			password: 'jhfdcthjk24r44',
			
			
		};
  
		chai.request(app)
			.post('/api/v1/auth/signin')
			.send(body)
			.end((err, res) => {
				expect(res.body.status).to.equal(422);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should return some values are missing ', (done) => {
		const body = {
			email: 'davephenomgmail.com',
		
			
		};
  
		chai.request(app)
			.post('/api/v1/auth/signin')
			.send(body)
			.end((err, res) => {
				expect(res.body.status).to.equal(422);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should update user password ', (done) => {
		const body = {
			old_password: 'ee',
			new_password: 'fd',
		
		};
  
		chai.request(app)
			.patch('/api/v1/reset/update')
			.set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwYzcyYzcxOC1jNDEzLTRjNTctYjBiYy0wYzRmMDBmMWY2N2MiLCJpYXQiOjE1NjMxNzQxNzYsImV4cCI6MTU2Mzc3ODk3Nn0.GtCQ41hEKP1YJ3i5qKWBHnM3-wHvNBJ1QA0w5bJ0ZtE')
			.send(body)
			.end((err, res) => {
				expect(res.body.status).to.equal(200);
				expect(res.body).to.be.a('object');
				done();
			});
	});
	it('it should return password mismatch ', (done) => {
		const body = {
			old_password: 'e',
			new_password: 'fd',
		
		};
  
		chai.request(app)
			.patch('/api/v1/reset/update')
			.set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwYzcyYzcxOC1jNDEzLTRjNTctYjBiYy0wYzRmMDBmMWY2N2MiLCJpYXQiOjE1NjMxNzQxNzYsImV4cCI6MTU2Mzc3ODk3Nn0.GtCQ41hEKP1YJ3i5qKWBHnM3-wHvNBJ1QA0w5bJ0ZtE')
			.send(body)
			.end((err, res) => {
				expect(res.body.status).to.equal(200);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should delete a user information ', (done) => {
		
		chai.request(app)
			.delete('/api/v1/auth/delete')
			.set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNjA4OTZiZi0zNWJhLTQxY2UtOWNiYy01MThlYjE1YjQwYTkiLCJpYXQiOjE1NjMxNzM0MjcsImV4cCI6MTU2Mzc3ODIyN30.iiM5Rt5WeuvYqH1dX8Xg6j3V2AuSXetkyKr_PDEIaho')
			.end((err, res) => {
				expect(res.body.status).to.equal(204);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should return you cannot delete this user information ', (done) => {
		
		chai.request(app)
			.delete('/api/v1/auth/delete')
			.set('Authorization','eyJhbGciOiJIUfzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNjA4OTZiZi0zNWJhLTQxY2UtOWNiYy01MThlYjE1YjQwYTkiLCJpYXQiOjE1NjMxNzM0MjcsImV4cCI6MTU2Mzc3ODIyN30.iiM5Rt5WeuvYqH1dX8Xg6j3V2AuSXetkyKr_PDEIaho')
			.end((err, res) => {
				expect(res.body.status).to.equal(401);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	
     
});

