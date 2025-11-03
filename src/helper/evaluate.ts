import { tokenize } from "./tokenizer";

export function evaluate(expression: sting): number {
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3, '%': 2 };
  const operationStack: string[] = [];
  const outputQueue: (string | number)[] = [];
  const tokens = tokenize(expression);


  for (const token of tokens) {
    if (!isNaN(parseFloat(token))) {
      outputQueue.push(parseFloat(token));
    } else if (token in precedence) {
      while (
        operationStack.length > 0 &&
        operationStack[operationStack.length - 1] !== '(' &&
        precedence[operationStack[operationStack.length - 1] as keyof typeof precedence] >= precedence[token as keyof typeof precedence]
      ) {
        outputQueue.push(operationStack.pop()!);
      }
      operationStack.push(token);
    }

    while (operationStack.length > 0) {
      outputQueue.push(operationStack.pop()!);
    }
    console.log(outputQueue, operationStack)
  }

}