import { describe, expect, it } from "vitest";
import { tokenize } from "../helper/tokenizer";

describe("tokenize", () => {
  it("should tokenize a simple expression", () => {
    expect(tokenize("1 + 2")).toEqual(["1", "+", "2"]);
  });

  it("should tokenize an expression with no spaces", () => {
    expect(tokenize("1+2")).toEqual(["1", "+", "2"]);
  });

  it("should tokenize numbers with multiple digits", () => {
    expect(tokenize("123 + 456")).toEqual(["123", "+", "456"]);
  });

  it("should tokenize a decimal number", () => {
    expect(tokenize("1.23 + 4.56")).toEqual(["1.23", "+", "4.56"]);
  });

  it("should tokenize a negative number", () => {
    expect(tokenize("-12 + 22")).toEqual(["-12", "+", "22"]);
  })

  it("should tokenize an expression with negative numbers", () => {
    expect(tokenize("-12 + -22")).toEqual(["-12", "+", "-22"]);
  });
  it("should tokenize all operators", () => {
    expect(tokenize("1+2-3*4/5^6%7")).toEqual(["1", "+", "2", "-", "3", "*", "4", "/", "5", "^", "6", "%", "7"]);
  });

});