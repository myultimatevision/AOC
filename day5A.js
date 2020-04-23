const IntCode = require('./day5A.json');

const getAddress = function (intCode, index, mode, place) {
  return mode === 0 ? intCode[index + place] : index + place;
};

const doAddition = function (intCode, index, opcodeOperation) {
  const address1 = getAddress(intCode, index, opcodeOperation[2], 1);
  const address2 = getAddress(intCode, index, opcodeOperation[1], 2);
  const storage = getAddress(intCode, index, opcodeOperation[0], 3);
  intCode[storage] = intCode[address1] + intCode[address2];
};

const doMultiplication = function (intCode, index, opcodeOperation) {
  const address1 = getAddress(intCode, index, opcodeOperation[2], 1);
  const address2 = getAddress(intCode, index, opcodeOperation[1], 2);
  const storage = getAddress(intCode, index, opcodeOperation[0], 3);
  intCode[storage] = intCode[address1] * intCode[address2];
};

const doInput = function (intCode, index, opcodeOperation) {
  const Id = 1;
  const address = getAddress(intCode, index, opcodeOperation[2], 1);
  intCode[address] = Id;
};

const doOutput = function (intCode, index, opcodeOperation) {
  const address = getAddress(intCode, index, opcodeOperation[2], 1);
  return intCode[address];
};

const splitOpcode = function (opcode) {
  const splittedArray = opcode
    .toString()
    .split('')
    .map((num) => +num);
  for (let length = splittedArray.length; length < 5; length++) {
    splittedArray.unshift(0);
  }
  return splittedArray.slice();
};

const runOpcode = function (intCode) {
  const opcodeFunctions = {
    1: doAddition,
    2: doMultiplication,
    3: doInput,
    4: doOutput,
  };
  const indexManagement = { 1: 2, 2: 2, 3: 0, 4: 0, 5: 1, 6: 1, 7: 2, 8: 2 };

  const outputArray = [];
  for (let index = 0; index < intCode.length; index += 2) {
    let opcodeOperation = splitOpcode(intCode[index]);
    if (opcodeOperation[4] === 9 && opcodeOperation[3] === 9)
      return outputArray;
    const output = opcodeFunctions[opcodeOperation[4]](
      intCode,
      index,
      opcodeOperation
    );
    index += indexManagement[opcodeOperation[4]];

    if (opcodeOperation[4] === 4) outputArray.push(output);
  }
};

const main = function () {
  let intCode = IntCode.slice();
  const finalArray = runOpcode(intCode);
  console.log(finalArray);
};

main();
