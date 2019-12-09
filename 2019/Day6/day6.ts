import * as fs from "fs";
import { stringify } from "querystring";

const loadOrbits = () => fs.readFileSync("day6.txt", "utf8").split(/\n/);

console.log(loadOrbits());

interface Planet {
  orbitedBy: string[];
}

const parseOrbits = () => {
  const orbitsData = loadOrbits();
  const orbits = new Map();

  orbitsData.forEach(orbit => {
    const planets = orbit.split(")");
    if (orbits.has(planets[0])) {
      if (planets[0] === "B") {
        console.log(planets[1]);
        console.log(orbits[planets[0]]);
      }
      orbits.get(planets[0]).orbitedBy.push(planets[1]);
    } else {
      orbits.set(planets[0], { orbitedBy: [planets[1]] } as Planet);
    }

    if (!orbits.has(planets[1])) {
      orbits.set(planets[1], { orbitedBy: [] } as Planet);
    }
  });

  return orbits;
};

console.log(parseOrbits());
