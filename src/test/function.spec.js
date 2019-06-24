/* eslint-disable no-undef */
import {expect} from 'chai';
import { checkLetter } from '../utils/string';
import checkFloat from '../utils/checkfloat';


describe('Test for checkLetter() function',()=>{
	it('it checks if checkLetter function returns false',(done)=>{
		let arr = [false, true, false,true,true];
		expect(checkLetter(arr)).to.equal(false);
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

