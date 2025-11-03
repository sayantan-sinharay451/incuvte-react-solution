import { describe, it, expect } from "vitest";
import { validateTokens } from "../helper/validation";

describe("validateTokens", () => {
  it("should allow empty tokens (delegated to evaluate)", () => {
    expect(() => validateTokens([])).not.toThrow();
  });

  it("should throw if expression starts with operator", () => {
    expect(() => validateTokens(["+", "1"]))
      .toThrow("Invalid expression: Cannot start with operator +");
  });

  it("should throw if expression ends with operator", () => {
    expect(() => validateTokens(["1", "+"]))
      .toThrow("Invalid expression: Cannot end with operator +");
  });

  it("should throw when two consecutive numbers appear", () => {
    expect(() => validateTokens(["1", "2"]))
      .toThrow("Invalid expression: Unexpected number 2 after 1");
  });

  it("should throw when number is followed by open parenthesis without operator", () => {
    expect(() => validateTokens(["2", "("]))
      .toThrow("Invalid expression: Operator missing between 2 and (");
  });

  it("should throw when closing parenthesis is followed by a number without operator", () => {
    expect(() => validateTokens([")", "3"]))
      .toThrow("Invalid expression: Operator missing between ) and 3");
  });

  it("should throw when two consecutive operators appear", () => {
    expect(() => validateTokens(["1", "+", "-"]))
      .toThrow("Invalid expression: Cannot end with operator -");
  });

  it("should throw when operator is followed by closing parenthesis", () => {
    expect(() => validateTokens(["1", "+", ")"]))
      .toThrow("Invalid expression: Unexpected operator + before )");
  });

  it("should throw when open parenthesis is followed by operator", () => {
    expect(() => validateTokens(["(", "+", "1"]))
      .toThrow("Invalid expression: Unexpected operator + after (");
  });

  it("should not throw for a valid infix token sequence", () => {
    expect(() => validateTokens(["1", "+", "2", "*", "(", "3", ")"]))
      .not.toThrow();
  });
});
