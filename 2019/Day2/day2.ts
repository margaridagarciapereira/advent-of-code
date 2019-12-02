import * as fs from "fs";

const loadMemory = () =>
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
  instructionPointer: number
) => {
  const firstIndex = instructions[instructionPointer + 1];
  const secondIndex = instructions[instructionPointer + 2];
  const thirdIndex = instructions[instructionPointer + 3];

  if (operation === "Sum")
    instructions[thirdIndex] =
      instructions[firstIndex] + instructions[secondIndex];
  else
    instructions[thirdIndex] =
      instructions[firstIndex] * instructions[secondIndex];
};

const executeProgram = () => {
  let instructions = loadMemory();
  restoreGravity(instructions);
  let instructionPointer = 0;
  let opCode = 0;

  while (opCode !== 99 && instructionPointer < instructions.length - 3) {
    opCode = instructions[instructionPointer];

    if (opCode === 1) {
      executeCalc(instructions, "Sum", instructionPointer);
    }

    if (opCode === 2) {
      executeCalc(instructions, "Multiplication", instructionPointer);
    }
    instructionPointer += 4;
  }

  return instructions[0];
};

console.log("Part 1: ", executeProgram());
