import { evaluate } from "./helper/evaluate"

export const stringCalculator = (input: string): string => {
  if (input === "") {
    return "";
  }
  const lines = input.split('\n')
  const answers: string[] = lines.map(evaluate);

  return answers.join(",\n");
}