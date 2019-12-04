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

const wires = loadWires();
const wire1Coords = getCoordinates(wires[0]);
const intersections = findIntersections(wire1Coords, wires[1]);
const distanceToClosestIntersection = findClosestCoordinateToOrigin(intersections);

console.log('Part 1: ', distanceToClosestIntersection);
