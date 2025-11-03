import { describe, expect, it } from "vitest";
import { tokenize } from "../helper/tokenizer";

describe("tokenize", () => {
  it("should tokenize a simple expression", () => {
    expect(tokenize("1 + 2")).toEqual(["1", "+", "2"]);
  });
});