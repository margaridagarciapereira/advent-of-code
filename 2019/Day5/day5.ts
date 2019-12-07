import * as fs from "fs";
const readline = require("readline");

const loadMemory = () =>
  fs
    .readFileSync("day5.txt", "utf8")
    .split(/,\r?\n?/)
    .map(inst => +inst);

type Operation = "Sum" | "Multiplication" | "Input" | "Output";

const executeCalc = (
  instructions: number[],
  operation: Operation,
  instructionPointer: number,
  input?: number
) => {
  const firstParam = instructions[instructionPointer + 1];

  if (operation === "Sum") {
    const secondParam = instructions[instructionPointer + 2];
    const thirdParam = instructions[instructionPointer + 3];

    instructions[thirdParam] =
      instructions[firstParam] + instructions[secondParam];
  } else if (operation === "Multiplication") {
    const secondParam = instructions[instructionPointer + 2];
    const thirdParam = instructions[instructionPointer + 3];

    instructions[thirdParam] =
      instructions[firstParam] * instructions[secondParam];
  } else if (operation === "Output") {
    console.log(instructions[firstParam]);
  } else if (operation === "Input") {
    instructions[firstParam] = input;
  }
};

const executeProgram = (input: number) => {
  let instructions = loadMemory();
  let instructionPointer = 0;
  let opCode = 0;

  while (opCode !== 99 && instructionPointer < instructions.length - 3) {
    opCode = instructions[instructionPointer];

    if (opCode === 1) {
      executeCalc(instructions, "Sum", instructionPointer);
      instructionPointer += 4;
    }

    if (opCode === 2) {
      executeCalc(instructions, "Multiplication", instructionPointer);
      instructionPointer += 4;
    }

    if (opCode === 3) {
      executeCalc(instructions, "Input", instructionPointer, input);
      instructionPointer += 2;
    }

    if (opCode === 4) {
      executeCalc(instructions, "Output", instructionPointer);
      instructionPointer += 2;
    }
  }

  return instructions[0];
};

console.log("Part 1: ", executeProgram(1));
