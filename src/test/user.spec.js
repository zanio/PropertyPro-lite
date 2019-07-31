/* eslint-disable no-undef , prefer-destructuring, import/no-duplicates */
import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../app';
import { query } from '../model/index';


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
		const deletequery = 'DELETE FROM users WHERE id = $1';
		await query(deletequery, [userId]);
		request.close();
	});

	describe('SIGNUP ROUTE', () => {
		describe('SIGNUP SUCCESSFULLY', () => {
			it('should have a status of 201', async () => {
				const body = {
					email: 'akpsa.ani@yahoo.com',
					password: 'ee',
					address: 'block 199 flat 4',
					phone_number: '08023456789',
					first_name: 'Aniefiok',
					last_name: 'Akpan',
				};

				const { response } = await request.post('/api/v1/auth/signup').send(body);
				token = response.body.data.token;

				userId = response.body.data.id;
				expect(response.body.status).to.equal(201);
				expect(response.body).to.be.a('object');
			}).timeout(0);
		});

		describe('SIGNUP WITHOUT PASSWORD FIELD', () => {
			it('should have a status of 400', async () => {
				const body = {
					email: 'akp.s@yahoo.com',
					password: '',
					address: 'block 199 flat 4',
					phone_number: '08023456789',
					first_name: 'Aniefiok',
					last_name: 'Akpan',
				};

				const response = await request.post('/api/v1/auth/signup').send(body);
				expect(response.body.status).to.equal(400);
				expect(response.body).to.be.a('object');
			}).timeout(0);
		});

		describe('SIGNUP WITH invalid email', () => {
			it('should have a status of 409', async () => {
				const body = {
					email: 'akp.aniyahoo.com',
					address: 'block 199 flat 4',
					password: 'ee',
					phone_number: '08023456789',
					first_name: 'Aniefiok',
					last_name: 'Akpan',
				};

				const response = await request.post('/api/v1/auth/signup').send(body);
				expect(response.body.status).to.equal(409);
				expect(response.body).to.be.a('object');
			}).timeout(0);
		});

		describe('SIGNUP WITH ALREADY EXISTING EMAIL', () => {
			it('should have a status of 409', async () => {
				const body = {
					email: 'akp.ani@yahoo.com',
					address: 'block 199 flat 4',
					password: 'ee',
					phone_number: '08023456789',
					first_name: 'Aniefiok',
					last_name: 'Akpan',
				};

				const response = await request.post('/api/v1/auth/signup').send(body);
				expect(response.body.status).to.equal(409);
				expect(response.body).to.be.a('object');
			}).timeout(0);
		});
	});

	describe('SIGNIN ROUTE', () => {
		describe('SIGNIN SUCCESSFULLY', () => {
			it('should have a status of 200', async () => {
				const body = {
					email: 'akp.ani@yahoo.com',
					password: 'ee',

				};

				const response = await request.post('/api/v1/auth/signin').send(body);
				expect(response.body.status).to.equal(200);
				expect(response.body).to.be.a('object');
			}).timeout(0);
		});

		describe('SIGNIN WITH MISMATCH PASSWORD', () => {
			it('should have a status of 422', async () => {
				const body = {
					email: 'akp.ani@yahoo.com',
					password: 'eGe',

				};

				const response = await request.post('/api/v1/auth/signin').send(body);
				expect(response.body.status).to.equal(422);
				expect(response.body).to.be.a('object');
			}).timeout(0);
		});

		describe('SIGNIN WITH INVALID EMAIL', () => {
			it('should have a status of 422', async () => {
				const body = {
					email: 'akp.aniyahoo.com',
					password: 'ee',

				};

				const response = await request.post('/api/v1/auth/signin').send(body);
				expect(response.body.status).to.equal(422);
				expect(response.body).to.be.a('object');
			}).timeout(0);
		});

		describe('SIGNIN WITHOUT EMAIL', () => {
			it('should have a status of 422', async () => {
				const body = {
					password: 'ee',

				};

				const response = await request.post('/api/v1/auth/signin').send(body);
				expect(response.body.status).to.equal(422);
				expect(response.body).to.be.a('object');
			}).timeout(0);
		});

		describe('SIGNIN WITHOUT EMAIL ACCOUNT IN DATABASE', () => {
			it('should have a status of 403', async () => {
				const body = {
					email: 'a@as.com',
					password: 'ee',

				};

				const response = await request.post('/api/v1/auth/signin').send(body);
				expect(response.body.status).to.equal(403);
				expect(response.body).to.be.a('object');
			}).timeout(0);
		});
	});

	describe('UPDATE PASSWORD IF USERS IS AUTHENTICATED', () => {
		describe('UPDATE PASWORD IF OLD_PASSWORD AND NEW_PASSWORD IS PRESENT', () => {
			it('should have a status of 200', async () => {
				const body = {
					old_password: 'ee',
					new_password: 'ss',
				};
				const response = await request.patch('/api/v1/reset/update')
					.set('Authorization', token)
					.send(body);
				expect(response.body.status).to.equal(200);
				expect(response.body).to.be.a('object');
			}).timeout(0);
		});

		describe('UPDATE PASSWORD SHOULD FAIL BECAUSE PASSWORD DON"T MATCH', () => {
			it('should have a status of 422', async () => {
				const body = {
					old_password: 'eCe',
					new_password: 'ss',
				};
				const response = await request.patch('/api/v1/reset/update')
					.set('Authorization', token)
					.send(body);
				expect(response.body.status).to.equal(422);
				expect(response.body).to.be.a('object');
			}).timeout(0);
		});
	});


	describe('DELETE ROUTE', () => {
		describe('DELETE SUCCESSFULLY', () => {
			it('should have a status of 200', async () => {
				const response = await request.delete('/api/v1/auth/delete').set('Authorization', token);
				expect(response.body.status).to.equal(204);
				expect(response.body).to.be.a('object');
			}).timeout(0);
		});
	});
});
