const incode = require('./day2B.json');

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

const getTwoValues = function (opcode) {
  for (let address1 = 0; address1 < 100; address1++) {
    for (let address2 = 0; address2 < 100; address2++) {
      let intcode = opcode.slice();
      intcode[1] = address1;
      intcode[2] = address2;
      const finalArray = runOpcode(intcode);
      if (finalArray[0] === 19690720) {
        return [address1, address2];
      }
    }
  }
  return [0, 0];
};

const main = function () {
  let opcode = incode.slice();
  const [address1, address2] = getTwoValues(opcode);
  console.log(100 * address1 + address2);
};

main();
