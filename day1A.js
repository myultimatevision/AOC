const masses = require('./day1A.json');

const calculateFuelReq = function (mass) {
  return Math.floor(mass / 3) - 2;
};

const addFuels = function (totalFuel, fuel) {
  return (totalFuel += fuel);
};

const totalFuelRequirement = function (masses) {
  const arrayOfFuels = masses.map(calculateFuelReq);
  return arrayOfFuels.reduce(addFuels, 0);
};

const main = function () {
  const totalFuel = totalFuelRequirement(masses);
  console.log(totalFuel);
};

main();
