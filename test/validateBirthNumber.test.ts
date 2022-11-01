import chai from "chai";

import validate from "../src";

chai.should();

describe("validator tests", () => {
  it("should return false when input is not a string", () => {
    // @ts-ignore
    validate(null).should.be.false;
  });

  it("should return false when input is not 11 characters", () => {
    validate("1234").should.be.false;
  });

  it("should return false when d segment is invalid", () => {
    validate("ab010100050");
    validate("00010100050").should.be.false;
    validate("32010100050").should.be.false;
    validate("72010100050").should.be.false;
  });

  it("should return false when m segment is invalid", () => {
    validate("01ab0100050");
    validate("01000100050").should.be.false;
    validate("01130100050").should.be.false;
    validate("01530100050").should.be.false;
  });

  it("should return false when å segment is invalid", () => {
    validate("0101ab00050").should.be.false;
  });

  it("should return false when i segment is invalid", () => {
    validate("010101abc50").should.be.false;
  });

  it("should return false when k segment is invalid", () => {
    validate("010101000ab").should.be.false;
    validate("01010100099").should.be.false;
  });

  it("should return true for a valid birth number", () => {
    validate("01010100050").should.be.true;
  });

  it("should return true for a valid d-number", () => {
    validate("41010100044").should.be.true;
  });

  it("should return true for a valid h-number", () => {
    validate("01410100033").should.be.true;
  });
});
