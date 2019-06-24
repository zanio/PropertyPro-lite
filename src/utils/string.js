function stringCheck(el) {
    return typeof el === "string"?true:false;
}

const Arr = obj =>{
    const values = Object.values(obj)
    const regex = /^[a-zA-Z]+$/;
    let arr =[]
    values.map(val => arr.push(regex.test(val)))
  //  console.log(values)
    
    return arr
 }   

const checkLetter = (arrs)=> {
    let falseCheck = true;
    for(let i = 0;i <arrs.length;i++ ){
        if(!arrs[i]){
            return false
        }
    }  
    return falseCheck
 }
      
    

export {stringCheck,checkLetter,Arr};