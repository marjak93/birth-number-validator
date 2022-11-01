import debug from "debug";

import calculateChecksum from "./utils/calculateChecksum";

console.debug = debug("birth-number-validator");

/**
 * Returns whether the provided birth number is valid.
 *
 * Rules of validation:
 * - Must be 11 digits
 * - Digit 1 and 2 (d) must be between 01-31 or 41-71 inclusive
 * - Digit 3 and 4 (m) must be between 01-12 or 41-52 inclusive
 * - Digit 5 and 6 (å) must be between 00-99 inclusive
 * - Digit 7-9 (i) must be between 000-999 inclusive
 * - Digit 10 and 11 (k) is a checksum of the 9 previous digits
 */
export = (input: string): boolean => {
  if (typeof input !== "string") {
    console.debug("input is not a string");
    return false;
  }

  if (input.length !== 11) {
    console.debug("input has invalid length");
    return false;
  }

  // Verify birth number only contains valid characters
  const segments = input.match(
    /([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{3})([0-9]{2})/
  );

  if (!segments) {
    console.debug("birth number has invalid characters");
    return false;
  }

  // Destructure segments into own variables
  const [, d, m, å, i, k] = segments;

  // d segment check
  if (!((+d >= 1 && +d <= 31) || (+d >= 41 && +d <= 71))) {
    console.debug(`d = ${d} does not fit constraints`);
    return false;
  }

  // m segment check
  if (!((+m >= 1 && +m <= 12) || (+m >= 41 && +m <= 52))) {
    console.debug(`m = ${m} does not fit constraints`);
    return false;
  }

  // k segment check
  const checksum = calculateChecksum(d, m, å, i);
  if (checksum !== k) {
    console.debug(`k = ${k} does not match checksum = ${checksum}`);
    return false;
  }

  console.debug("birth number is valid!");

  return true;
};
