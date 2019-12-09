import * as fs from "fs";

const loadMemory = () =>
  fs
    .readFileSync("day5.txt", "utf8")
    .split(/,\r?\n?/)
    .map(inst => +inst);

type Operation =
  | "Sum"
  | "Multiplication"
  | "Input"
  | "Output"
  | "JumpIfTrue"
  | "JumpIfFalse"
  | "LessThan"
  | "Equals";

type Mode = "Immediate" | "Position";

const executeCalc = (
  instructions: number[],
  operation: Operation,
  config: Config,
  input?: number
): number | void => {
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
  } else if (operation === "JumpIfTrue") {
    const first =
      config.firstParam.mode === "Position"
        ? instructions[config.firstParam.value]
        : config.firstParam.value;

    const second =
      config.secondParam.mode === "Position"
        ? instructions[config.secondParam.value]
        : config.secondParam.value;

    if (first !== 0) {
      return second;
    }
  } else if (operation === "JumpIfFalse") {
    const first =
      config.firstParam.mode === "Position"
        ? instructions[config.firstParam.value]
        : config.firstParam.value;

    const second =
      config.secondParam.mode === "Position"
        ? instructions[config.secondParam.value]
        : config.secondParam.value;

    if (first === 0) {
      return second;
    }
  } else if (operation === "LessThan") {
    const first =
      config.firstParam.mode === "Position"
        ? instructions[config.firstParam.value]
        : config.firstParam.value;

    const second =
      config.secondParam.mode === "Position"
        ? instructions[config.secondParam.value]
        : config.secondParam.value;

    if (first < second) {
      instructions[config.thirdParam.value] = 1;
    } else {
      instructions[config.thirdParam.value] = 0;
    }
  } else if (operation === "Equals") {
    const first =
      config.firstParam.mode === "Position"
        ? instructions[config.firstParam.value]
        : config.firstParam.value;

    const second =
      config.secondParam.mode === "Position"
        ? instructions[config.secondParam.value]
        : config.secondParam.value;

    if (first === second) {
      instructions[config.thirdParam.value] = 1;
    } else {
      instructions[config.thirdParam.value] = 0;
    }
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
    modes.length < 3 || modes[2] === "0" ? "Position" : "Immediate";
  const secondParamMode: Mode =
    modes.length < 4 || modes[3] === "0" ? "Position" : "Immediate";
  const thirdParamMode: Mode =
    modes.length < 5 || modes[4] === "0" ? "Position" : "Immediate";

  if (opCode === 1 || opCode === 2 || opCode === 7 || opCode === 8) {
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
  } else if (opCode === 5 || opCode === 6) {
    return {
      opCode: opCode,
      firstParam: {
        value: instructions[instructionPointer + 1],
        mode: firstParamMode
      },
      secondParam: {
        value: instructions[instructionPointer + 2],
        mode: secondParamMode
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

    if (opCode === 5) {
      const newPointer = executeCalc(instructions, "JumpIfTrue", config);
      instructionPointer = newPointer ? newPointer : instructionPointer + 3;
    }

    if (opCode === 6) {
      const newPointer = executeCalc(instructions, "JumpIfFalse", config);
      instructionPointer = newPointer ? newPointer : instructionPointer + 3;
    }

    if (opCode === 7) {
      executeCalc(instructions, "LessThan", config);
      instructionPointer += 4;
    }

    if (opCode === 8) {
      executeCalc(instructions, "Equals", config);
      instructionPointer += 4;
    }
  }

  return instructions[0];
};

executeProgram(1);
console.log("End of Part 1");

executeProgram(5);
console.log("End of Part 5");
