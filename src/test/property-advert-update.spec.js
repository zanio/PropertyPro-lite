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



describe(' PATCH AD ROUTES', () => {
	

	it('it should post property advert ', function (done) {
    
		this.timeout(10000);
    
		const  body = {
			status:'sold',
			price:'12443.44',
			state:'benin',
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
			.post('/api/v1/property-advert/')
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

	it('it should update property of a given id ', function (done) {
    
		this.timeout(10000);
    
		const  body = {
			status:'available',
			price:'12443.44',
			state:'benin',
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
			.patch('/api/v1/property-advert/43501')
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
	it('it should return 404 because patch id was not found ', function (done) {
    
		this.timeout(10000);
    
		const  body = {
			status:'available',
			price:'12443.44',
			state:'benin',
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
			.patch('/api/v1/property-advert/435hg')
			.set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJFZBa01LVXVtaEdLWUxkbEZkc0lwVS54aS5mMGdSbnNwMTY1WXJCVUd4SUZsUmQvR1VpTFhLIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6Im11c2EiLCJsYXN0X25hbWUiOiJmZWtsZ2dpeCIsImVtYWlsIjoiZGFiY2JnZHlAYWhvby5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWQWtNS1V1bWhHS1lMZGxGZHNJcFUueGkuZjBnUm5zcDE2NVlyQlVHeElGbFJkL0dVaUxYSyIsImFkZHJlc3MiOiJibG9jayAxOTkgZmxhdCA0IiwicGhvbmVfbnVtYmVyIjoiMDkwODc4NTY3ODQiLCJnZW5kZXIiOiJtYWxlIiwiaXNfQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTYxNzc3NTQ1fQ.2rYG5nfwuB5FWXeq1cfu_DJKIfiDWx8B4LjjrlrCtkg')
			.attach('image','src/test/Screenshot (24).png')
			.field(body)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.status).to.equal(404);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	
    
     
});

