import * as fs from "fs";

const getInstructions = () =>
  fs
    .readFileSync("day2.txt", "utf8")
    .split(/,\r?\n?/)
    .map(inst => +inst);

const restoreGravity = (instructions: number[]) => {
  instructions[1] = 12;
  instructions[2] = 2;
};

type Operation = "Sum" | "Multiplication";

const executeCalc = (
  instructions: number[],
  operation: Operation,
  operationIndex: number
) => {
  const firstIndex = instructions[operationIndex + 1];
  const secondIndex = instructions[operationIndex + 2];
  const thirdIndex = instructions[operationIndex + 3];

  console.log(firstIndex, secondIndex, thirdIndex);

  if (operation === "Sum")
    instructions[thirdIndex] =
      instructions[firstIndex] + instructions[secondIndex];
  else
    instructions[thirdIndex] =
      instructions[firstIndex] * instructions[secondIndex];
};

let instructions = getInstructions();
restoreGravity(instructions);
let index = 0;
let instruction = 0;
console.log(instructions);
console.log(instructions.length);
while (instruction !== 99 && index < instructions.length - 3) {
  instruction = instructions[index];

  if (instruction === 1) {
    executeCalc(instructions, "Sum", index);
  }

  if (instruction === 2) {
    executeCalc(instructions, "Multiplication", index);
  }
  index += 4;
}

console.log("Part 1: ", instructions[0]);
