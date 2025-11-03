export function tokenize(expression: string): string[] {
  const tokens: string[] = [];

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    tokens.push(char);
  }
  return tokens;
}