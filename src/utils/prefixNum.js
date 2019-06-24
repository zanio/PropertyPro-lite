const key = require('../config/keys')

const generateRandom = len=>{
  const keys = key.char
  const secretNum1 = key.numPrefix1;
  const secretNum2 = key.numPrefix2;

  let prefix = ""

  for(let i=0; i < len; i++){
      prefix += keys.charAt(Math.floor(Math.random()*36))
  }

  return secretNum1+prefix+secretNum2

}


export {generateRandom}