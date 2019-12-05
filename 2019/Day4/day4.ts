import * as fs from "fs";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

const loadRanges = () => fs.readFileSync("day4.txt", "utf8").split(/\-/);

const isThereRepeatedDigits = (pwd: string) => {
  for (let d = 0; d < 5; d++) {
    if (pwd[d] === pwd[d + 1]) {
      return true;
    }
  }
  return false;
};

const getAmountOfValidPwds = () => {
  const ranges = loadRanges();
  let counter = 0;

  for (let i = +ranges[0]; i < +ranges[1]; i++) {
    const pwd = i.toString();
    const digits = pwd.split("");

    if (digits.sort().join("") === pwd) {
      // means all digits only increase or stay the same
      if (isThereRepeatedDigits(pwd)) {
        counter++;
      }
    }
  }

  return counter;
};

console.log("Part 1: ", getAmountOfValidPwds());
