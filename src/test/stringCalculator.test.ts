import { describe, expect, it } from "vitest";
import { stringCalculator } from "../stringCalculator";

describe("stringCalculator", () => {
  it("should return empty if input is empty", () => {
    expect(stringCalculator("")).toBe("");
  });

  it("should calculate a simple addition", () => {
    expect(stringCalculator("1 + 2")).toEqual("3");
  });

  it("should handle operator precedence", () => {
    expect(stringCalculator("2 + 3 * 4")).toEqual("14");
  });

  it("should handle parentheses", () => {
    expect(stringCalculator("(2 + 3) * 4")).toEqual("20");
  });

  it("should handle all operators", () => {
    expect(stringCalculator("10 % 3")).toEqual("1");
    expect(stringCalculator("2 ^ 3")).toEqual("8");
  });

  it("should handle decimal numbers", () => {
    expect(stringCalculator("1.5 + 2.5")).toEqual("4");
  });

  it("should handle multiple lines", () => {
    expect(stringCalculator("1 + 2\n3 * 4")).toEqual("3,12");
  });

  it("should handle negative numbers", () => {
    expect(stringCalculator("-1 + -2")).toEqual("-3");
  });

  // New behaviors
  it("should ignore blank lines when joining results", () => {
    // assuming evaluate returns "" for blank/whitespace-only lines, they should be filtered out
    expect(stringCalculator("1 + 1\n\n2 + 2")).toEqual("2,4");
  });

  it("should trim and handle extra spaces around tokens", () => {
    expect(stringCalculator("   3    +    4   ")).toEqual("7");
  });

  it("should support very large numbers without precision loss for integers", () => {
    expect(stringCalculator("9007199254740991 + 1")).toEqual("9007199254740992");
  });

  it("should evaluate each line independently and join with commas", () => {
    expect(stringCalculator("5-2\n(1+2)*3\n10/2")).toEqual("3,9,5");
  });

  it("should propagate errors for invalid expressions via thrown exceptions", () => {
    // tokenizer/evaluate are expected to throw on invalid input
    expect(() => stringCalculator("1 +\ninvalid" as unknown as string)).toThrow();
  });
});



