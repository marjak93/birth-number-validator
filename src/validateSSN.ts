import debug from "debug";

import calculateChecksum from "./utils/calculateChecksum";

console.debug = debug("validator");

/**
 * Returns true if the provided social security number is valid.
 *
 * Rules of validation:
 * - Must be 11 digits
 * - Digit 1 and 2 (d) must be between 01-31 or 41-71 inclusive
 * - Digit 3 and 4 (m) must be between 01-12 or 41-52 inclusive
 * - Digit 5 and 6 (å) must be between 00-99 inclusive
 * - Digit 7-9 (i) must be between 000-999 inclusive
 * - Digit 10 and 11 (k) is a checksum of the 9 previous digits
 */
export = (ssn: number | string): boolean => {
  // Convert to string type
  if (typeof ssn === "number") {
    ssn = String(ssn);
  }

  if (ssn.length !== 11) {
    return false;
  }

  // Split ssn into segments described above
  const [, d, m, å, i, k] = ssn.match(/(.{2})(.{2})(.{2})(.{3})(.{2})/);

  // d segment checks
  const _d: number = Number(d);
  if (Number.isNaN(_d)) {
    console.debug(`d = ${d} is not a number`);
    return false;
  }

  if (!((_d >= 1 && _d <= 31) || (_d >= 41 && _d <= 71))) {
    console.debug(`d = ${d} does not fit constraints`);
    return false;
  }

  // m segment checks
  const _m: number = Number(m);
  if (Number.isNaN(_m)) {
    console.debug(`m = ${m} is not a number`);
    return false;
  }

  if (!((_m >= 1 && _m <= 12) || (_m >= 41 && _m <= 52))) {
    console.debug(`m = ${m} does not fit constraints`);
    return false;
  }

  // å segment checks
  const _å: number = Number(å);
  if (Number.isNaN(_å)) {
    console.debug(`å = ${å} is not a number`);
    return false;
  }

  // i segment checks
  const _i: number = Number(i);
  if (Number.isNaN(_i)) {
    console.debug(`i = ${i} is not a number`);
    return false;
  }

  // k segment checks
  const _k: number = Number(k);
  if (Number.isNaN(_k)) {
    console.debug(`k = ${k} is not a number`);
    return false;
  }

  if (calculateChecksum(d, m, å, i) !== k) {
    console.debug(`k = ${k} is not a valid checksum`);
    return false;
  }

  return true;
};
