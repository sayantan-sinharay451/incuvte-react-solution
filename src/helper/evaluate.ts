import { tokenize } from "./tokenizer";
import { validateTokens } from "./validation";

export function evaluate(expression: string): string {
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3, "%": 2 };
  const operationStack: string[] = [];
  const outputQueue: (string | number)[] = [];
  const tokens = tokenize(expression);
  validateTokens(tokens);

  for (const token of tokens) {
    if (!isNaN(parseFloat(token))) {
      outputQueue.push(parseFloat(token));
    } else if (token in precedence) {
      // pops out all the operation if an incoming operation has less precedence
      while (
        operationStack.length > 0 &&
        operationStack[operationStack.length - 1] !== "(" &&
        precedence[
        operationStack[
        operationStack.length - 1
        ] as keyof typeof precedence
        ] >= precedence[token as keyof typeof precedence]
      ) {
        outputQueue.push(operationStack.pop()!);
      }
      operationStack.push(token);
    } else if (token === '(') {
      operationStack.push(token);
    } else if (token === ')') {
      while (operationStack.length > 0 && operationStack[operationStack.length - 1] !== '(') {
        outputQueue.push(operationStack.pop()!);
      }
      operationStack.pop(); // Pop the '('
    }
  }

  while (operationStack.length > 0) {
    outputQueue.push(operationStack.pop()!);
  }

  const evaluationStack: number[] = [];
  for (const token of outputQueue) {
    if (typeof token === "number") {
      evaluationStack.push(token);
    } else {
      // extracts the numbers that are pushed and perform the operations based on precedence 
      const right = evaluationStack.pop()!;
      const left = evaluationStack.pop()!;
      switch (token) {
        case "+":
          evaluationStack.push(left + right);
          break;
        case "-":
          evaluationStack.push(left - right);
          break;
        case "*":
          evaluationStack.push(left * right);
          break;
        case "/":
          evaluationStack.push(left / right);
          break;
        case "^":
          evaluationStack.push(Math.pow(left, right));
          break;
        case "%":
          evaluationStack.push(left % right);
          break;
      }
    }
  }

  if (evaluationStack.length === 0) {
    return ""
  }

  return evaluationStack[0].toString();
}
