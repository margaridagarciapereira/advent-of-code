/**  Fuel required to launch a given module is based on its mass. 
Specifically, to find the fuel required for a module, take its mass, 
divide by three, round down, and subtract 2. */
import * as fs from "fs";

let sumOfFuel: number = fs
  .readFileSync("day1_masses.txt", "utf8")
  .split(/\r?\n/)
  .reduce((prev, curr) => prev + Math.floor(+curr / 3 - 2), 0);

console.log(sumOfFuel);
