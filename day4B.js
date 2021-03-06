const passwordRange = require('./day4A.json');

const splitNum = function (num) {
  const arrayOfPassword = [];
  for (i = 0; i < 6; i++) {
    arrayOfPassword.unshift(num % 10);
    num = Math.floor(num / 10);
  }
  return arrayOfPassword.slice();
};

const areDoublesThere = function (digit, index, passwordArray) {
  const otherDigitIndex = passwordArray.findIndex((num) => num === digit);
  return otherDigitIndex === index - 1 && passwordArray[index + 1] !== digit;
  t;
};

const isAnyAdjacentDigitsSame = function (num) {
  const arrayOfPassword = splitNum(num);
  return arrayOfPassword.some(areDoublesThere);
};

const isDigitsIncrementing = function (num) {
  const arrayOfPassword = splitNum(num);
  let previousNum;
  for (let digit = 0; digit < 6; digit++) {
    if (previousNum > arrayOfPassword[digit]) return false;
    previousNum = arrayOfPassword[digit];
  }
  return true;
};

const getAllPossiblePasswords = function (passwordLimit) {
  const possiblePasswords = [];
  for (
    let password = passwordLimit.min;
    password <= passwordLimit.max;
    password++
  ) {
    if (isDigitsIncrementing(password) && isAnyAdjacentDigitsSame(password)) {
      possiblePasswords.push(password);
    }
  }
  return possiblePasswords.slice();
};

const main = function () {
  const possiblePasswords = getAllPossiblePasswords(passwordRange);
  console.log(possiblePasswords.length);
};

main();
