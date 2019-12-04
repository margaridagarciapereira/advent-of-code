/** Disclaimer: did not use Set<ICoordinate> in this solution has Sets functionality is not great in es6
 * and for it to work, it would have very high complexity; hence the creation of the method findIntersection here. */

import * as fs from "fs";

const loadWires = () =>
  fs
    .readFileSync("day3.txt", "utf8")
    .split(/\r?\n/)
    .map(wire => wire.split(","));

interface ICoordinate {
  x: number;
  y: number;
}

const getCoordinates = (wire: string[]) => {
  let x = 0,
    y = 0;
  const coordinates: ICoordinate[] = [];

  wire.forEach(instruction => {
    const amount = +instruction.slice(1, instruction.length);

    // Up
    if (instruction[0] === "U") {
      for (let i = 1; i <= amount; i++, y--) {
        coordinates.push({ x, y } as ICoordinate);
      }
    }
    // Down
    else if (instruction[0] === "D") {
      for (let i = 1; i <= amount; i++, y++) {
        coordinates.push({ x, y } as ICoordinate);
      }
    }
    // Left
    else if (instruction[0] === "L") {
      for (let i = 1; i <= amount; i++, x--) {
        coordinates.push({ x, y } as ICoordinate);
      }
    }
    // Right
    else {
      for (let i = 1; i <= amount; i++, x++) {
        coordinates.push({ x, y } as ICoordinate);
      }
    }
  });

  return coordinates;
};

const findIntersections = (wire1Coords: ICoordinate[], wire2: string[]) => {
  let x = 0,
    y = 0;
  const intersections: ICoordinate[] = [];

  wire2.forEach(instruction => {
    const amount = +instruction.slice(1, instruction.length);

    // Up
    if (instruction[0] === "U") {
      intersections.push(
        ...wire1Coords.filter(c => c.x === x && c.y >= y - amount && c.y < y)
      );
      y -= amount;
    }
    // Down
    else if (instruction[0] === "D") {
      intersections.push(
        ...wire1Coords.filter(c => c.x === x && c.y > y && c.y <= y + amount)
      );
      y += amount;
    }
    // Left
    else if (instruction[0] === "L") {
      intersections.push(
        ...wire1Coords.filter(c => c.y === y && c.x >= x - amount && c.x < x)
      );
      x -= amount;
    }
    // Right
    else {
      intersections.push(
        ...wire1Coords.filter(c => c.y === y && c.x > x && c.x <= x + amount)
      );
      x += amount;
    }
  });

  return intersections;
};

const findClosestCoordinateToOrigin = (intersections: ICoordinate[]) => {
  return Math.min.apply(
    Math,
    intersections.map(c => Math.abs(c.x) + Math.abs(c.y))
  );
};

const findStepsNeededForQuickestIntersection = (
  wire1: ICoordinate[],
  wire2: ICoordinate[],
  intersections: ICoordinate[]
) => {
  let sum = undefined;
  intersections.forEach(int => {
    const noSteps =
      wire1.indexOf(wire1.filter(c => c.x === int.x && c.y === int.y)[0]) +
      wire2.indexOf(wire2.filter(c => c.x === int.x && c.y === int.y)[0]);
    if (!sum || (sum && sum > noSteps)) {
      sum = noSteps;
    }
  });
  return sum;
};

const wires = loadWires();
const wire1Coords = getCoordinates(wires[0]);
const intersections = findIntersections(wire1Coords, wires[1]);
const distanceToClosestIntersection = findClosestCoordinateToOrigin(
  intersections
);

console.log("Part 1: ", distanceToClosestIntersection);

const wire2Coords = getCoordinates(wires[1]);
console.log(
  "Part 2: ",
  findStepsNeededForQuickestIntersection(
    wire1Coords,
    wire2Coords,
    intersections
  )
);
