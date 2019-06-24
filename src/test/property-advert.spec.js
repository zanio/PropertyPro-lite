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
describe(' POST AD ROUTES', () => {
	it('it should create new car adverts ', (done) => {
		const body = {
			manufacturer:'volvo',
			model:'yoyarbv',
			price:'787',
			state:'lagos',
			body_type:'vgfg',
			color:'red'
          
		};
  
		chai.request(app)
			.post('/api/v1/property-advert')
			.set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoyMzQwMTMwMDUwMDEsInVzZXIiOnsic3RhdHVzIjoyMDAsImRhdGEiOnsiaWQiOjIzNDAxMzAwNTAwMSwiY3JlYXRlZEF0IjoiRnJpIEp1biAwNyAyMDE5IDE4OjE4OjEyIEdNVCswMTAwIChXZXN0IEFmcmljYSBTdGFuZGFyZCBUaW1lKSIsInVwZGF0ZWRBdCI6IkZyaSBKdW4gMDcgMjAxOSAxODoxODoxMiBHTVQrMDEwMCAoV2VzdCBBZnJpY2EgU3RhbmRhcmQgVGltZSkiLCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpqYjJSbElqb2lKREppSkRFd0pHNVlWRzE2UkU1YUwzbzNOa1YzZURGdFpGbEVSM1Z6UjJScWRHTkZMMjFqVkdNME4yOW1TekpoVWs1eFZHRnRUVXAwZGpSeElpd2lhV0YwSWpveE5UVTVPVEkzT0RreWZRLmxGOEYxNWhyUkctRk01WE1MZHQ1QXlPeklaaEU3QkIwQ3ZQaTIza2QxeDAiLCJmaXJzdF9uYW1lIjoibXVzYSIsImxhc3RfbmFtZSI6ImZla2xpeCIsInBhc3N3b3JkIjoiJDJiJDEwJG5YVG16RE5aL3o3NkV3eDFtZFlER3VzR2RqdGNFL21jVGM0N29mSzJhUk5xVGFtTUp0djRxIiwiYWRkcmVzcyI6ImJsb2NrIDE5OSBmbGF0IDQiLCJpc19BZG1pbiI6dHJ1ZSwiZW1haWwiOiJhdmJ2dmFidnh2dmNAYWhvby5jb20ifX0sImlhdCI6MTU1OTkyNzkxNX0.3a0UB5Lim_r1RMqILEq7NDBVNeOwB6sxSyPYqDjHAHI')
			.send(body)
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.be.a('object');
				done();
			});
	});

	it('it shold return 401 unauthorized ', (done) => {
		const body = {
			manufacturer:'volvo',
			model:'yoyarbv',
			price:'787',
			state:'lagos',
			body_type:'vgfg',
			color:'red'
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

