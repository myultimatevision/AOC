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
  const Id = 5;
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

const doLessThan = function (intCode, index, opcodeOperation) {
  const address1 = getAddress(intCode, index, opcodeOperation[2], 1);
  const address2 = getAddress(intCode, index, opcodeOperation[1], 2);
  const storage = getAddress(intCode, index, opcodeOperation[0], 3);
  intCode[address1] < intCode[address2]
    ? (intCode[storage] = 1)
    : (intCode[storage] = 0);
};

const doEquals = function (intCode, index, opcodeOperation) {
  const address1 = getAddress(intCode, index, opcodeOperation[2], 1);
  const address2 = getAddress(intCode, index, opcodeOperation[1], 2);
  const storage = getAddress(intCode, index, opcodeOperation[0], 3);
  intCode[address1] === intCode[address2]
    ? (intCode[storage] = 1)
    : (intCode[storage] = 0);
};

const doJumpIfTrue = function (intCode, index, opcodeOperation) {
  const address = getAddress(intCode, index, opcodeOperation[2], 1);
  const jump = getAddress(intCode, index, opcodeOperation[1], 2);
  if (intCode[address] === 0) return index;
  return intCode[jump] - 3;
};

const doJumpIfFalse = function (intCode, index, opcodeOperation) {
  const address = getAddress(intCode, index, opcodeOperation[2], 1);
  const jump = getAddress(intCode, index, opcodeOperation[1], 2);
  if (intCode[address] === 0) {
    console.log(index);

    return intCode[jump] - 3;
  }
  return index;
};

const runOpcode = function (intCode) {
  const opcodeFunctions = {
    1: doAddition,
    2: doMultiplication,
    3: doInput,
    4: doOutput,
    5: doJumpIfTrue,
    6: doJumpIfFalse,
    7: doLessThan,
    8: doEquals,
  };
  const indexManagement = { 1: 2, 2: 2, 3: 0, 4: 0, 5: 1, 6: 1, 7: 2, 8: 2 };
  const outputArray = [];
  for (let index = 0; index < intCode.length; index += 2) {
    // console.log(intCode);
    let opcodeOperation = splitOpcode(intCode[index]);
    if (opcodeOperation[4] === 9 && opcodeOperation[3] === 9)
      return outputArray;
    const output = opcodeFunctions[opcodeOperation[4]](
      intCode,
      index,
      opcodeOperation
    );

    if (opcodeOperation[4] === 5 || opcodeOperation[4] === 6) {
      index = output;
    }

    if (opcodeOperation[4] === 4) outputArray.push(output);

    index += indexManagement[opcodeOperation[4]];
  }
};

const main = function () {
  let intCode = IntCode.slice();
  const finalArray = runOpcode(intCode);
  console.log(finalArray);
};

main();
