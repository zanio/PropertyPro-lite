/* eslint-disable no-undef */
import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';



//https://dev.to/asciidev/testing-a-nodeexpress-application-with-mocha--chai-4lho
chai.use(chaiHttp);
//Our parent block

/*
  * Test the /GET route
  */
describe('/GET user account info', () => {
	it('it should GET unauthenticated user ', (done) => {
		chai.request(app)
			.get('/api/v1/my-account/*')
			.end((err, res) => {
				expect(res.status).to.equal(401);
				done();
			});
	});

	it('it should GET authenticated user ', (done) => {
		chai.request(app)
			.get('/api/v1/my-account/*')
			.set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoyMzQwMTMwMDUwMDIsInVzZXIiOnsic3RhdHVzIjoyMDAsImRhdGEiOnsiaWQiOjIzNDAxMzAwNTAwMiwiY3JlYXRlZEF0IjoiVGh1IEp1biAwNiAyMDE5IDIyOjMyOjIzIEdNVCswMTAwIChXZXN0IEFmcmljYSBTdGFuZGFyZCBUaW1lKSIsInVwZGF0ZWRBdCI6IlRodSBKdW4gMDYgMjAxOSAyMjozMjoyMyBHTVQrMDEwMCAoV2VzdCBBZnJpY2EgU3RhbmRhcmQgVGltZSkiLCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpqYjJSbElqb2lKREppSkRFd0pFeDVaRkJYZG5welNEWkdjbW96VEU1RlRUYzJSazl2TjFoa2JIa3ZSbUpoVmtVMGEyaHFVVGhMWkZGM1VuVjJZM0I1YnpkMUlpd2lhV0YwSWpveE5UVTVPRFUyTnpRemZRLjlMb2t4UEViM1V2eFFaUlY1TzRwMnlsZUoxenM0NUx6YkJ1eDUtb2NYVW8iLCJmaXJzdF9uYW1lIjoibXVzYSIsImxhc3RfbmFtZSI6ImZla2xpeCIsInBhc3N3b3JkIjoiJDJiJDEwJEx5ZFBXdnpzSDZGcmozTE5FTTc2Rk9vN1hkbHkvRmJhVkU0a2hqUThLZFF3UnV2Y3B5bzd1IiwiYWRkcmVzcyI6ImJsb2NrIDE5OSBmbGF0IDQiLCJpc19BZG1pbiI6dHJ1ZSwiZW1haWwiOiJhYmJ2eHhtY2JAeWFoaC5jb20ifX0sImlhdCI6MTU1OTg1Njc2OH0.czsT4ZMGy3jec7DZUHK9t0vyPEKCQjry8AO5EhpHcJ4')
			.end((err, res) => {
				expect(res.status).to.equal(200);
				done();
			});
	});

     
});

