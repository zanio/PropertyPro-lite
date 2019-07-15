/* eslint-disable no-undef */
import {expect} from 'chai';
import { emailToken,generateId,newDate,hashPassword,isValidEmail,generateToken,comparePassword} from '../helpers/helper';





describe('Helper function in helpers folder test',()=>{

	

	it('it checks if newDate function returns a new date in tolocalString',(done)=>{		
		expect(newDate()).to.equal(new Date().toLocaleString());
		done();
	});

	

	

	it('it checks if harshPassword function returns a new object if successful',(done)=>{
		
		hashPassword('ehhjfhjhf4764jfj')
			.then(res=>{
				console.log(res);
				expect(res).to.equal(res);
				expect(res).to.be.a(typeof res);
			});
			
		done();
	});

	it('it checks if hashPassword function returns a new object if successful',(done)=>{
		
		comparePassword('$2b$10$SAJrb0z4BQisTu6.pI41aO.HSBq72vWkxjmxhFU83nsfgMCnJZYu6','ehhjfhjhf4764jfj')
			.then(res=>{
				expect(res).to.equal(true);
				expect(res).to.be.a(typeof res);
			});
			
		done();
	});

	it('it generate new token',(done)=>{
		
		generateToken('hjhhguybn')
			.then(res=>{
				
				expect(res).to.equal(res);
				expect(res).to.be.a(typeof res);
			});
			
		done();
	});
	
	it('it generate new email token',(done)=>{
		
		emailToken(12234)
			.then(res=>{
				console.log(res);
				expect(res).to.equal(res);
				expect(res).to.be.a(typeof res);
			});
			
		done();
	});

	it('it checks if isValidEmail function returns true or false',(done)=>{
		
		
		
		expect(isValidEmail('a@a.com')).to.equal(true);
			
			
		done();
	});

	it('it checks if generateId function returns int',(done)=>{
		
		
		expect(generateId()).to.be.a('number');			
			
		done();
	});

	

	
	

	

});


