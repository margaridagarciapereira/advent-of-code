import * as fs from "fs";
const readline = require("readline");

const loadMemory = () =>
  fs
    .readFileSync("day5.txt", "utf8")
    .split(/,\r?\n?/)
    .map(inst => +inst);

type Operation = "Sum" | "Multiplication" | "Input" | "Output";

type Mode = "Immediate" | "Position";

const executeCalc = (
  instructions: number[],
  operation: Operation,
  config: Config,
  input?: number
) => {
  if (operation === "Sum") {
    const first =
      config.firstParam.mode === "Position"
        ? instructions[config.firstParam.value]
        : config.firstParam.value;

    const second =
      config.secondParam.mode === "Position"
        ? instructions[config.secondParam.value]
        : config.secondParam.value;

    instructions[config.thirdParam.value] = first + second;
  } else if (operation === "Multiplication") {
    const first =
      config.firstParam.mode === "Position"
        ? instructions[config.firstParam.value]
        : config.firstParam.value;
    const second =
      config.secondParam.mode === "Position"
        ? instructions[config.secondParam.value]
        : config.secondParam.value;

    instructions[config.thirdParam.value] = first * second;
  } else if (operation === "Output") {
    const first =
      config.firstParam.mode === "Position"
        ? instructions[config.firstParam.value]
        : config.firstParam.value;
    console.log(first);
  } else if (operation === "Input") {
    instructions[config.firstParam.value] = input;
  } else console.log("Not a valid operation.");
};

interface Param {
  value: number;
  mode: Mode;
}

interface Config {
  opCode: number;
  firstParam?: Param;
  secondParam?: Param;
  thirdParam?: Param;
}

const parseInstruction = (
  instructions: number[],
  instructionPointer: number
): Config | null => {
  const configCode = instructions[instructionPointer];

  const opCode = configCode % 100;

  const modes = configCode.toString().split("");
  modes.reverse();

  const firstParamMode: Mode =
    modes.length < 3 || modes[2] === "0" /*|| opCode === 3 */
      ? "Position"
      : "Immediate";
  const secondParamMode: Mode =
    modes.length < 4 || modes[3] === "0" ? "Position" : "Immediate";
  const thirdParamMode: Mode =
    modes.length < 5 || modes[4] === "0" /*|| opCode === 1 || opCode === 2*/
      ? "Position"
      : "Immediate";

  if (opCode === 1 || opCode === 2) {
    return {
      opCode: opCode,
      firstParam: {
        value: instructions[instructionPointer + 1],
        mode: firstParamMode
      },
      secondParam: {
        value: instructions[instructionPointer + 2],
        mode: secondParamMode
      },
      thirdParam: {
        value: instructions[instructionPointer + 3],
        mode: thirdParamMode
      }
    } as Config;
  } else if (opCode === 3 || opCode === 4) {
    return {
      opCode: opCode,
      firstParam: {
        value: instructions[instructionPointer + 1],
        mode: firstParamMode
      }
    } as Config;
  } else if (opCode === 99) {
    return { opCode: opCode } as Config;
  } else return null;
};

const executeProgram = (input: number) => {
  let instructions = loadMemory();
  let instructionPointer = 0;
  let opCode = 0;
  while (opCode !== 99 && instructionPointer < instructions.length) {
    const config = parseInstruction(instructions, instructionPointer);
    opCode = config.opCode;

    if (opCode === 1) {
      executeCalc(instructions, "Sum", config);
      instructionPointer += 4;
    }

    if (opCode === 2) {
      executeCalc(instructions, "Multiplication", config);
      instructionPointer += 4;
    }

    if (opCode === 3) {
      executeCalc(instructions, "Input", config, input);
      instructionPointer += 2;
    }

    if (opCode === 4) {
      executeCalc(instructions, "Output", config);
      instructionPointer += 2;
    }
  }

  return instructions[0];
};

console.log("Part 1: ", executeProgram(1));
