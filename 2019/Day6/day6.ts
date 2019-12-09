import * as fs from "fs";

const loadOrbits = () => fs.readFileSync("day6.txt", "utf8").split(/\n/);

interface Planet {
  orbitedBy: string[];
}

const parseOrbits = () => {
  const orbitsData = loadOrbits();
  const orbits = new Map<string, Planet>();

  orbitsData.forEach(orbit => {
    const planets = orbit.split(")");
    if (orbits.has(planets[0])) {
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

const countRecursive = (orbits: Map<string, Planet>, planet: string, counter: number) => {
    if(orbits.has(planet)) {
        if (orbits.get(planet).orbitedBy.length === 0) {
            return counter;
        }
        else {
            const orbitedBy = orbits.get(planet).orbitedBy;
            let innerCount = 0;
            for(let i = 0; i < orbitedBy.length; i++) {
                innerCount += countRecursive(orbits, orbitedBy[i], counter+1);
            }
            return counter + innerCount;
        }
    }
    return counter;
};

const countOrbits = () => {
    const orbits = parseOrbits();

    return countRecursive(orbits, 'COM', 0);
};

console.log('Part 1: ', countOrbits());
