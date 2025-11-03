export function validateTokens(tokens: string[]) {
  if (tokens.length === 0) {
    return; // Allow empty expressions, evaluate will handle it.
  }

  const isNumber = (token: string) => !isNaN(parseFloat(token));
  const isOperator = (token: string) => ['+', '-', '*', '/', '^', '%'].includes(token);

  // Rule: Cannot start with a binary operator
  if (isOperator(tokens[0])) {
    throw new Error(`Invalid expression: Cannot start with operator ${tokens[0]}`);
  }

  // Rule: Cannot end with an operator
  if (isOperator(tokens[tokens.length - 1])) {
    throw new Error(`Invalid expression: Cannot end with operator ${tokens[tokens.length - 1]}`);
  }

  for (let i = 0; i < tokens.length - 1; i++) {
    const current = tokens[i];
    const next = tokens[i + 1];

    // Rule: Number cannot be followed by a number
    if (isNumber(current) && isNumber(next)) {
      throw new Error(`Invalid expression: Unexpected number ${next} after ${current}`);
    }

    // Rule: Number cannot be followed by an open parenthesis without an operator
    if (isNumber(current) && next === '(') {
      throw new Error(`Invalid expression: Operator missing between ${current} and ${next}`);
    }

    // Rule: Closing parenthesis cannot be followed by a number without an operator
    if (current === ')' && isNumber(next)) {
      throw new Error(`Invalid expression: Operator missing between ${current} and ${next}`);
    }

    // Rule: Operator cannot be followed by another operator
    if (isOperator(current) && isOperator(next)) {
      throw new Error(`Invalid expression: Unexpected operator ${next} after ${current}`);
    }

    // Rule: Operator cannot be followed by a closing parenthesis
    if (isOperator(current) && next === ')') {
      throw new Error(`Invalid expression: Unexpected operator ${current} before ${next}`);
    }

    // Rule: Open parenthesis cannot be followed by an operator
    if (current === '(' && isOperator(next)) {
      throw new Error(`Invalid expression: Unexpected operator ${next} after ${current}`);
    }
  }
}
