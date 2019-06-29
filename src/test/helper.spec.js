/* eslint-disable no-undef */
import {expect} from 'chai';
import { getNewId,newDate,mustBeInArray,harshPassword,getSubId,adminDb,typeSearch } from '../helpers/helper';



const array = [
	{ 
		first_name: 'clington',
		last_name: 'tuoyo',
		is_Admin: true,
		email: 'clingtoneyituoyo@gmail.com',
		id:234013005001,
		type:'flat'
		
	},
	{ 
		first_name: 'clington',
		last_name: 'tuoyo',
		is_Admin: true,
		email: 'clingtoneyituoyo@gmail.com',
		id:234013005001,
		type:'mini-flat'
		
	},
	{ 
		first_name: 'clington',
		last_name: 'tuoyo',
		is_Admin: true,
		email: 'clingtoneyituoyo@gmail.com',
		id:234013005001,
		type:'flat'
		
	}
];

const subid = [{ 
	id:43501,
}
];

describe('Helper function in helpers folder test',()=>{

	it('it checks if getNewId function returns a new id++ number',(done)=>{		
		expect(getNewId(array)).to.equal(234013005002);
		done();
	});

	it('it checks if getNewId function returns a new id number',(done)=>{		
		expect(getNewId([])).to.equal(234013005001);
		done();
	});

	it('it checks if getSubId function returns a new id++ number',(done)=>{		
		expect(getSubId(subid)).to.equal(43502);
		done();
	});

	it('it checks if getSubId function returns a new id number',(done)=>{		
		expect(getSubId([])).to.equal(43501);
		done();
	});

	it('it checks if newDate function returns a new date in tolocalString',(done)=>{		
		expect(newDate()).to.equal(new Date().toLocaleString());
		done();
	});

	it('it checks if mustBeInArray function returns a new object if successful ',(done)=>{
		
		mustBeInArray(array,'234013005001')
			.then(res=>{
				
				expect(res).to.equal(res);
			});
		done();
	});

	it('it checks if mustBeInArray function does not returns a new object if error exist',(done)=>{
		
		mustBeInArray(array,'234013005008')
			.catch(err=>{
				expect(err.status).to.equal(404);
			});
		done();
	});

	it('it checks if harshPassword function returns a new object if successful',(done)=>{
		
		harshPassword('ehhjfhjhf4764jfj')
			.then(res=>{
				
				expect(res).to.equal(res);
				expect(res).to.be.a(typeof res);
			});
			
		done();
	});

	it('it checks if adminDb function returns a new object if successful',(done)=>{
		
		adminDb(array,'clingtoneyituoyo@gmail.com')
			.then(res=>{
				
				expect(res).to.be.a('object');
				expect(res).to.be.a(typeof res);
			});
			
		done();
	});

	it('it checks if typeSearch function returns a new object if successful',(done)=>{
		
		typeSearch(array,'flat')
			.then(res=>{
				
				expect(res).to.be.equal(res);
			});
			
		done();
	});
	it('it checks if typeSearch function returns an error object',(done)=>{
		
		typeSearch(array,'ghght')
			.catch(err=>{
				expect(err.status).to.equal(404);
			});
			
		done();
	});

	

});


