/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';



//https://dev.to/asciidev/testing-a-nodeexpress-application-with-mocha--chai-4lho
chai.use(chaiHttp);
//Our parent block

/*
  * Test the Car /POST route
  */

describe('GET and POST AD  ROUTES', () => {

	it('it should return no property advert created yet ', (done) => {
		chai.request(app)
			.get('/property-advert')
			.end((err, res) => {
				expect(err).to.equal(404);
				done();
			});
	});




	it('it should create new property advert ', function (done) {
    
		this.timeout(10000);
    
		const  body = {
			status:'sold',
			price:'12443.44',
			state:'lagos',
			city:'vi',
			address:'block 188',
			type:'flat',
			contact_person_number:'098123456732',
			property_name:'adewale',
			contact_person_address:'block 199 flat 4',
			proof:'yes i do',
			note:'just be a good buyer'
		};
    
  
		chai.request(app)
			.post('/api/v1/property-advert')
			.set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJFZBa01LVXVtaEdLWUxkbEZkc0lwVS54aS5mMGdSbnNwMTY1WXJCVUd4SUZsUmQvR1VpTFhLIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6Im11c2EiLCJsYXN0X25hbWUiOiJmZWtsZ2dpeCIsImVtYWlsIjoiZGFiY2JnZHlAYWhvby5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWQWtNS1V1bWhHS1lMZGxGZHNJcFUueGkuZjBnUm5zcDE2NVlyQlVHeElGbFJkL0dVaUxYSyIsImFkZHJlc3MiOiJibG9jayAxOTkgZmxhdCA0IiwicGhvbmVfbnVtYmVyIjoiMDkwODc4NTY3ODQiLCJnZW5kZXIiOiJtYWxlIiwiaXNfQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTYxNzc3NTQ1fQ.2rYG5nfwuB5FWXeq1cfu_DJKIfiDWx8B4LjjrlrCtkg')
			.attach('image','src/test/Screenshot (24).png')
			.field(body)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.status).to.equal(200);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should return 403 with state can not contain number ', function (done) {
    
    
		const  body = {
			status:'sold',
			price:'12443.44',
			state:'lag1os',
			city:'vi',
			address:'block 188',
			type:'flat',
			contact_person_number:'098123456732',
			property_name:'adewale',
			contact_person_address:'block 199 flat 4',
			proof:'yes i do',
			note:'just be a good buyer'
		};
    
  
		chai.request(app)
			.post('/api/v1/property-advert')
			.set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJFZBa01LVXVtaEdLWUxkbEZkc0lwVS54aS5mMGdSbnNwMTY1WXJCVUd4SUZsUmQvR1VpTFhLIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6Im11c2EiLCJsYXN0X25hbWUiOiJmZWtsZ2dpeCIsImVtYWlsIjoiZGFiY2JnZHlAYWhvby5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWQWtNS1V1bWhHS1lMZGxGZHNJcFUueGkuZjBnUm5zcDE2NVlyQlVHeElGbFJkL0dVaUxYSyIsImFkZHJlc3MiOiJibG9jayAxOTkgZmxhdCA0IiwicGhvbmVfbnVtYmVyIjoiMDkwODc4NTY3ODQiLCJnZW5kZXIiOiJtYWxlIiwiaXNfQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTYxNzc3NTQ1fQ.2rYG5nfwuB5FWXeq1cfu_DJKIfiDWx8B4LjjrlrCtkg')
			.attach('image','src/test/Screenshot (24).png')
			.field(body)
			.end((err, res) => {
				expect(res.status).to.equal(403);
				expect(res.body).to.be.a('object');
				done();
			});
	});


	it('it should return 403 with all field required ', function (done) {
    
		const  body = {
			status:'sold',
			price:'12443.44',
			type:'flat',
			contact_person_number:'098123456732',
			property_name:'adewale',
			contact_person_address:'block 199 flat 4',
			proof:'yes i do',
			note:'just be a good buyer'
		};
    
  
		chai.request(app)
			.post('/api/v1/property-advert')
			.set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJFZBa01LVXVtaEdLWUxkbEZkc0lwVS54aS5mMGdSbnNwMTY1WXJCVUd4SUZsUmQvR1VpTFhLIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6Im11c2EiLCJsYXN0X25hbWUiOiJmZWtsZ2dpeCIsImVtYWlsIjoiZGFiY2JnZHlAYWhvby5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWQWtNS1V1bWhHS1lMZGxGZHNJcFUueGkuZjBnUm5zcDE2NVlyQlVHeElGbFJkL0dVaUxYSyIsImFkZHJlc3MiOiJibG9jayAxOTkgZmxhdCA0IiwicGhvbmVfbnVtYmVyIjoiMDkwODc4NTY3ODQiLCJnZW5kZXIiOiJtYWxlIiwiaXNfQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTYxNzc3NTQ1fQ.2rYG5nfwuB5FWXeq1cfu_DJKIfiDWx8B4LjjrlrCtkg')
			.attach('image','src/test/Screenshot (24).png')
			.field(body)
			.end((err, res) => {
				expect(res.status).to.equal(403);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should return 403 with error of image field is required ', function (done) {
    
	
		const  body = {
			status:'sold',
			price:'12443.44',
			state:'lagos',
			city:'vi',
			address:'block 188',
			type:'flat',
			contact_person_number:'098123456732',
			property_name:'adewale',
			contact_person_address:'block 199 flat 4',
			proof:'yes i do',
			note:'just be a good buyer'
		};
    
  
		chai.request(app)
			.post('/api/v1/property-advert')
			.set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJFZBa01LVXVtaEdLWUxkbEZkc0lwVS54aS5mMGdSbnNwMTY1WXJCVUd4SUZsUmQvR1VpTFhLIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6Im11c2EiLCJsYXN0X25hbWUiOiJmZWtsZ2dpeCIsImVtYWlsIjoiZGFiY2JnZHlAYWhvby5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWQWtNS1V1bWhHS1lMZGxGZHNJcFUueGkuZjBnUm5zcDE2NVlyQlVHeElGbFJkL0dVaUxYSyIsImFkZHJlc3MiOiJibG9jayAxOTkgZmxhdCA0IiwicGhvbmVfbnVtYmVyIjoiMDkwODc4NTY3ODQiLCJnZW5kZXIiOiJtYWxlIiwiaXNfQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTYxNzc3NTQ1fQ.2rYG5nfwuB5FWXeq1cfu_DJKIfiDWx8B4LjjrlrCtkg')
			.field(body)
			.end((err, res) => {
				expect(res.status).to.equal(403);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should return 401 with error of token secret mismatch ', function (done) {
	
		const  body = {
			status:'sold',
			price:'12443.44',
			type:'flat',
			contact_person_number:'098123456732',
			property_name:'adewale',
			contact_person_address:'block 199 flat 4',
			proof:'yes i do',
			note:'just be a good buyer'
		};
  
		chai.request(app)
			.post('/api/v1/property-advert')
			.set('Authorization','Bearer eyJhbGciOiJIUzI1biIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJFZBa01LVXVtaEdLWUxkbEZkc0lwVS54aS5mMGdSbnNwMTY1WXJCVUd4SUZsUmQvR1VpTFhLIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6Im11c2EiLCJsYXN0X25hbWUiOiJmZWtsZ2dpeCIsImVtYWlsIjoiZGFiY2JnZHlAYWhvby5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWQWtNS1V1bWhHS1lMZGxGZHNJcFUueGkuZjBnUm5zcDE2NVlyQlVHeElGbFJkL0dVaUxYSyIsImFkZHJlc3MiOiJibG9jayAxOTkgZmxhdCA0IiwicGhvbmVfbnVtYmVyIjoiMDkwODc4NTY3ODQiLCJnZW5kZXIiOiJtYWxlIiwiaXNfQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTYxNzc3NTQ1fQ.2rYG5nfwuB5FWXeq1cfu_DJKIfiDWx8B4LjjrlrCtkg')
			.field(body)
			.end((err, res) => {
				expect(res.status).to.equal(401);
				expect(res.body).to.be.a('object');
				done();
			});
	});


	it('it shold return 401 unauthorized ', (done) => {
		const  body = {
			status:'sold',
			price:'12443.44',
			type:'flat',
			contact_person_number:'098123456732',
			property_name:'adewale',
			contact_person_address:'block 199 flat 4',
			proof:'yes i do',
			note:'just be a good buyer'
		};
		
		chai.request(app)
			.post('/api/v1/property-advert')
			.send(body)
			.end((err, res) => {
				expect(res.status).to.equal(401);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it should get all property advert ', (done) => {
		chai.request(app)
			.get('/property-advert')
			.end((err, res) => {
				expect(res.status).to.equal(200);
				done();
			});
	});

	it('it should get all property advert matching the search query ', (done) => {
		chai.request(app)
			.get('/property-advert/search?type=flat')
			.end((err, res) => {
				expect(res.status).to.equal(200);
				done();
			});
	});

	it('it should return not found advert because search query value does not exist ', (done) => {
		chai.request(app)
			.get('/property-advert/search?type=flagft')
			.end((err, res) => {
				expect(res.status).to.equal(404);
				done();
			});
	});

    
     
});



