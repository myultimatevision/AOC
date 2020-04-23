const masses = require('./day2A.json');

const doAddition = function (opcode, index) {
  const address1 = opcode[index + 1];
  const address2 = opcode[index + 2];
  const address3 = opcode[index + 3];
  opcode[address3] = opcode[address1] + opcode[address2];
};
const doMultiplication = function (opcode, index) {
  const address1 = opcode[index + 1];
  const address2 = opcode[index + 2];
  const address3 = opcode[index + 3];
  opcode[address3] = opcode[address1] * opcode[address2];
};

const runOpcode = function (opcode) {
  const opcodeFunctions = { add: doAddition, mul: doMultiplication };
  for (let index = 0; index < opcode.length; index += 4) {
    if (opcode[index] === 99) return opcode;
    const operation = opcode[index] === 1 ? 'add' : 'mul';
    opcodeFunctions[operation](opcode, index);
  }
};

const main = function () {
  let opcode = masses.slice();
  opcode[1] = 12;
  opcode[2] = 2;
  const finalArray = runOpcode(opcode);
  console.log(finalArray[0]);
};

main();
