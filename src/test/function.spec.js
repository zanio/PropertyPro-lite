/* eslint-disable no-undef */
import {expect} from 'chai';
import { checkLetter,stringCheck } from '../utils/string';
import { phoneLength } from '../utils/numRegex';
import checkFloat from '../utils/checkfloat';


describe('Test for checkLetter() function',()=>{
	it('it checks if checkLetter function returns false',(done)=>{
		let arr = [false, true, false,true,true];
		expect(checkLetter(arr)).to.equal(false);
		done();
	});

	it('it checks if stringCheck() returns true ',(done)=>{	
		expect(stringCheck('teststring')).to.equal(true);
		done();
	});

	it('it checks if stringCheck() returns false ',(done)=>{	
		expect(stringCheck(122)).to.equal(false);
		done();
	});

	it('it checks if phoneLength() returns false ',(done)=>{	
		expect(phoneLength('122')).to.equal(false);
		done();
	});

	it('it checks if phoneLength() returns true ',(done)=>{	
		expect(phoneLength('09023456712')).to.equal(true);
		done();
	});

	it('it checks if checkLetter function returns true',(done)=>{
		let arr = [true, true,true,true];
		expect(checkLetter(arr)).to.equal(true);
		done();
	});

});

describe('Test for checkFloat() function',()=>{
	it('it checks if checkFloat function returns false',(done)=>{
		let arr = 'as445';
		expect(checkFloat(arr)).to.equal(false);
		done();
	});

	it('it checks if checkFloat function returns float',(done)=>{
		let arr = '445.45';
		expect(checkFloat(arr)).to.equal(445.45);
		done();
	});
});

