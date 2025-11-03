import { describe, expect, it } from "vitest";
import { stringCalculator } from "../stringCalculator";

describe("stringCalculator", () => {
  it("should return empty if input is empty", () => {
    expect(stringCalculator("")).toBe("");
  });


  // it("should calculate a simple addition", () => {
  //   expect(stringCalculator("1 + 2")).toEqual([3]);
  // });
})



