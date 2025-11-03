import { evaluate } from "./helper/evaluate"
import { tokenize } from "./helper/tokenizer";

export const stringCalculator = (input: string): string => {


  const lines = input.split('\n')
  const answers = lines.map(evaluate);

  return input;
}