import chai from "chai";

import validateSSN from "../src/validateSSN";

const should = chai.should();

describe("validator tests", () => {
  it("should return false when input is not 11 characters", () => {
    validateSSN("1234").should.be.false;
  });

  it("should return false when date segment is invalid", () => {
    validateSSN("ab999999999");
    validateSSN("00999999999").should.be.false;
    validateSSN("32999999999").should.be.false;
    validateSSN("72999999999").should.be.false;
  });

  it("should return false when month segment is invalid", () => {
    validateSSN("01ab9999999");
    validateSSN("01009999999").should.be.false;
    validateSSN("01139999999").should.be.false;
    validateSSN("01539999999").should.be.false;
  });

  it("should return false when year segment is invalid", () => {
    validateSSN("0101ab99999").should.be.false;
  });

  it("should return false when individ segment is invalid", () => {
    validateSSN("010101abc99").should.be.false;
  });

  it("should return false when checksum segment is invalid", () => {
    validateSSN("010101000ab").should.be.false;
    validateSSN("01010100099").should.be.false;
  });
});
