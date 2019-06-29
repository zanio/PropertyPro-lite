/* eslint-disable no-undef */
import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import fs from 'fs';



//https://dev.to/asciidev/testing-a-nodeexpress-application-with-mocha--chai-4lho
chai.use(chaiHttp);
//Our parent block

/*
  * Test the Car /POST route
  */
describe(' POST AD ROUTES', () => {
	it('it should create new property advert ', (done) => {
    
    
    
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
			.set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJENGcU1TTUdybEVYazBQZ2ZsREhQSHVYeVI1RkNBaE1LOUZLaEFHM1BKVDF1TU9MNjV5dXdHIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImRkZiIsImxhc3RfbmFtZSI6InZkc3ZkIiwiZW1haWwiOiJhZGV3YWxlLm9sYW95b0B5YWhvby5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRDRnFNU01HcmxFWGswUGdmbERIUEh1WHlSNUZDQWhNSzlGS2hBRzNQSlQxdU1PTDY1eXV3RyIsImFkZHJlc3MiOiJzZmZmIiwicGhvbmVfbnVtYmVyIjoiMDkwMTIzNDUzMjEiLCJnZW5kZXIiOiJtYWxlIiwiaXNfQWRtaW4iOnRydWV9LCJpYXQiOjE1NjE2MjU4ODl9.Tn5VJbvjwxuUuXTskV7HVWvtAb0nOfBkPO9RlYL2PFM')
			.type('form')
			.attach('file','src/test/Screenshot (24).png')
			.field(body)
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it shold return 401 unauthorized ', (done) => {
		
		const body = {
			status:'sold',
			price:'12443.44',
			state:'lagos',
			city:'vi',
			address:'block 188',
			type:'flat',
      
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

    
     
});

