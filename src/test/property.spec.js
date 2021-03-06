/* eslint-disable no-undef ,func-names,
 prefer-destructuring, import/no-duplicates, no-unused-vars */
import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../app';
import { query } from '../model/index';


let request;
let propertyId;
let firstUserToken;
let secondUserToken;
let firstUserId;
let secondUserId;
let reportId;
let firstUserEmail;
let propertyId1;

chai.use(chaiHttp);
chai.use(sinonChai);


/*
  * Test the /POST route
  */
describe('/property', () => {
	before(async function () {
		request = chai.request(app).keepOpen();
		this.timeout(0);
		const firstUser = {
			email: 'akp.anidbv@yahoo.com',
			password: 'ee',
			address: 'block 199 flat 4',
			phone_number: '08023456789',
			first_name: 'Aniefiok',
			last_name: 'Akpan',
		};
		const secondUser = {
			email: 'akcvpan.ani@yahoo.com',
			password: 'ee',
			address: 'block 199 flat 4',
			phone_number: '08023456789',
			first_name: 'Aniefiok',
			last_name: 'Akpan',
		};


		const firstUserResponse = await request.post('/api/v1/auth/signup')
			.send(firstUser);
		firstUserToken = firstUserResponse.body.data.token;
		firstUserId = firstUserResponse.body.data.id;
		firstUserEmail = firstUserResponse.body.data.email;


		const secondUserResponse = await request.post('/api/v1/auth/signup')
			.send(secondUser);
		secondUserId = secondUserResponse.body.data.id;
		secondUserToken = secondUserResponse.body.data.token;

		const propertyBody = {


			state: 'lagos',
			city: 'lekki',
			type: '2 bedroom',
			price: '23890',
			address: 'block 199 flat 4, jakande estate',

		};

		const propertyResponse = await request.post('/api/v1/property')
			.set('Authorization', firstUserToken)
			.attach('image_url', 'src/test/img2.png')
			.field(propertyBody);
		propertyId = propertyResponse.body.data.id;


		const reportBody = {

			reason: 'frudulent',
			description: 'frudulent without proof',
			experience: 'terrible',
		};

		const reportResponse = await request.post(`/api/v1/property/${propertyId}/report`)
			.set('Authorization', secondUserToken)
			.send(reportBody);
		reportId = reportResponse.body.data.id;
	});


	afterEach(() => sinon.restore());

	after(async () => {
		const userQuery = 'DELETE FROM users WHERE id = $1';
		const propertyQuery = 'DELETE FROM property WHERE id = $1';
		const reportQuery = 'DELETE FROM report WHERE id = $1';
		await query(userQuery, [firstUserId]);
		await query(userQuery, [secondUserId]);
		await query(reportQuery, [reportId]);
		await query(propertyQuery, [propertyId]);
		request.close();
	});

	describe('PROPERTY CREATE ROUTE', () => {
		describe('PROPERTY ADVERT SUCCESS', () => {
			it('should have a status of 201', async () => {
				const body = {
					state: 'lagos',
					city: 'lekki',
					type: '2 bedroom',
					price: '23890',
					address: 'block 199 flat 4, jakande estate',

				};

				const response = await request.post('/api/v1/property')
					.set('Authorization', secondUserToken)
					.attach('image_url', 'src/test/img2.png')
					.field(body);

				expect(response.body.status).to.equal(201);
			});
		});

		describe('PROPERTY ADVERT WITH UNKNOWN TOKEN', () => {
			it('should have a status of 401', async () => {
				const body = {
					state: 'lagos',
					city: 'lekki',
					type: '2 bedroom',
					price: '23890',
					address: 'block 199 flat 4, jakande estate',

				};

				const response = await request.post('/api/v1/property')
					.set('Authorization', 'hjjfjriu')
					.attach('image_url', 'src/test/img2.png')
					.field(body);


				expect(response.body.status).to.equal(401);
			}).timeout(0);
		});

		describe('PROPERTY ADVERT WITHOUT IMAGE', () => {
			it('should have a status of 403', async () => {
				const body = {
					state: 'lagos',
					city: 'lekki',
					type: '2 bedroom',
					price: '23890',
					address: 'block 199 flat 4, jakande estate',

				};

				const response = await request.post('/api/v1/property')
					.set('Authorization', firstUserToken)
					.attach('image_url', '')
					.field(body);

				expect(response.body.status).to.equal(403);
			}).timeout(0);
		});

		describe('PROPERTY ADVERT BECAUSE THERE IS A MISSING REQUIRED FIELD', () => {
			it('should have a status of 403', async () => {
				const body = {
					state: 'lagos',
					city: '',
					type: '2 bedroom',
					price: '23890',
					address: 'block 199 flat 4, jakande estate',

				};

				const response = await request.post('/api/v1/property')
					.set('Authorization', firstUserToken)
					.attach('image_url', 'src/test/img2.png')
					.field(body);

				expect(response.body.status).to.equal(403);
			}).timeout(0);
		});
	});

	describe('PATCH ROUTE WITH ID', () => {
		describe('PATCH PROPERTY ADVERT FOR PRICE ONLY SUCCESS', () => {
			it('should have a status of 200', async () => {
				const body = {
					price: '2399890',
				};

				const response = await request.patch(`/api/v1/property/${propertyId}`)
					.set('Authorization', firstUserToken)
					.attach('image_url', 'src/test/img1.jpg')
					.field(body);

				expect(response.body.status).to.equal(200);
			});
		});

		describe('PATCH PROPERTY ADVERT FOR EVERY OTHER BODY PROPERTY', () => {
			it('should have a status of 200', async () => {
				const body = {
					state: 'BENIN',
					city: '',
					type: '2 bedroom',
					price: '238443490',
					address: 'block 199 flat 4, jakande estate',

				};

				const response = await request.patch(`/api/v1/property/${propertyId}`)
					.set('Authorization', firstUserToken)
					.attach('image_url', 'src/test/img1.jpg')
					.field(body);

				expect(response.body.status).to.equal(200);
			});
		});

		describe('PROPERTY ADVERT NO PRICE', () => {
			it('should have a status of 403', async () => {
				const body = {

					price: '',
				};

				const response = await request.patch(`/api/v1/property/${propertyId}`)
					.set('Authorization', firstUserToken)
					.attach('image_url', 'src/test/img2.png')
					.field(body);

				expect(response.body.status).to.equal(403);
			});
		});
	});
});
