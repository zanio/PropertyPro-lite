/* eslint-disable indent */
function stringCheck(el) {
    return typeof el === 'string';
}

const Arr = (obj) => {
    const values = Object.values(obj);
    const regex = /^[a-zA-Z\s-]+$/;
    const arr = [];
    values.map(val => arr.push(regex.test(val)));

    return arr;
 };

const checkLetter = (arrs) => {
    const falseCheck = true;
    for (let i = 0; i < arrs.length; i += 1) {
        if (!arrs[i]) {
            return false;
        }
    }
    return falseCheck;
 };


export { stringCheck, checkLetter, Arr };
