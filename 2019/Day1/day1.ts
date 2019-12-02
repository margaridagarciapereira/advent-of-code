/**  Fuel required to launch a given module is based on its mass. 
Specifically, to find the fuel required for a module, take its mass, 
divide by three, round down, and subtract 2. */
import * as fs from "fs";

const getInitialFuelMasses = () =>
  fs.readFileSync("day1_masses.txt", "utf8").split(/\r?\n/);

const calculateFuelMassNeeded = (mass: number) => Math.floor(mass / 3 - 2);

const getFueldMasses = () =>
  getInitialFuelMasses().map(mass => calculateFuelMassNeeded(+mass));

const sumOfFuelMasses = getFueldMasses().reduce((prev, curr) => prev + curr);

console.log(`Part 1: ${sumOfFuelMasses}`);

const getFuelNeededByFuel = (fuelMass: number) => {
  let mass = fuelMass;
  let totalFuelMass = 0;
  while (mass >= 0) {
    mass = calculateFuelMassNeeded(mass);
    totalFuelMass += mass > 0 ? mass : 0;
  }
  return totalFuelMass;
};

const fuelNeeded = getInitialFuelMasses().reduce(
  (prev, curr) => prev + getFuelNeededByFuel(+curr),
  0
);

console.log(`Part 2: ${fuelNeeded}`);
