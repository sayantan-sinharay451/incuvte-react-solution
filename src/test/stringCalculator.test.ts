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
})



