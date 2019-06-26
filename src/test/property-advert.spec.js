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
// describe(' POST AD ROUTES', () => {
// 	it('it should create new property advert adverts ', (done) => {
// 		const body = {
// 			manufacturer:'volvo',
// 			model:'yoyarbv',
// 			price:'787',
// 			state:'lagos',
// 			body_type:'vgfg',
// 			color:'red'
          
// 		};
  
// 		chai.request(app)
// 			.post('/api/v1/property-advert')
// 			.set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJHAzVk5XTkFNTFcuSTRZVWZ3NDlkVWVxRG5WZDg1S1BXUHpGalk4YmFVc0tRRHJWaEpuOURxIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImRkZiIsImxhc3RfbmFtZSI6InZkc3ZkIiwiZW1haWwiOiJhZGV3YWxlLm9sYW95b0B5YWhvby5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRwM1ZOV05BTUxXLkk0WVVmdzQ5ZFVlcURuVmQ4NUtQV1B6RmpZOGJhVXNLUURyVmhKbjlEcSIsImFkZHJlc3MiOiJzZmZmIiwicGhvbmVfbnVtYmVyIjoiMDkwMTIzNDUzMjEiLCJnZW5kZXIiOiJtYWxlIiwiaXNfQWRtaW4iOnRydWV9LCJpYXQiOjE1NjE1NjM2MTV9.6ln1TUdyMqRJIfxq-WDjq-D8h-wGinH-ffLnWb86YYQ')
// 			.send(body)
// 			.end((err, res) => {
// 				expect(res.status).to.equal(200);
// 				expect(res.body).to.be.a('object');
// 				done();
// 			});
// 	});

// 	it('it shold return 401 unauthorized ', (done) => {
// 		const body = {
// 			manufacturer:'volvo',
// 			model:'yoyarbv',
// 			price:'787',
// 			state:'lagos',
// 			body_type:'vgfg',
// 			color:'red'
// 		};
  
// 		chai.request(app)
// 			.post('/api/v1/property-advert')
// 			.send(body)
// 			.end((err, res) => {
// 				expect(res.status).to.equal(401);
// 				expect(res.body).to.be.a('object');
// 				done();
// 			});
// 	});

    
     
// });

