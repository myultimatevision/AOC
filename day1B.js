const masses = require('./day1B.json');

const fuelReqForSingleModule = function (mass) {
  if (mass < 6) return 0;
  const fuel = Math.floor(mass / 3) - 2;
  return fuel + fuelReqForSingleModule(fuel);
};

const addFuels = function (totalFuel, fuel) {
  console.log(fuel);
  return (totalFuel += fuel);
};

const totalFuelRequirement = function (masses) {
  const arrayOfFuels = masses.map(fuelReqForSingleModule);
  return arrayOfFuels.reduce(addFuels, 0);
};

const main = function () {
  const totalFuel = totalFuelRequirement(masses);
  console.log(totalFuel);
};

main();
