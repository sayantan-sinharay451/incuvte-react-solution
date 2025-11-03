export function tokenize(expression: string): string[] {
  const tokens: string[] = [];
  let currToken = '';


  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (char === ' ') {
      continue;
    }
    // Arithmetic symbols
    if (/[\+\*\/\^\%\(\)]/.test(char)) {
      if (currToken) {
        tokens.push(currToken);
        currToken = '';
      }
      tokens.push(char);
    } else {
      currToken += char;
    }
  }
  if (currToken) {
    tokens.push(currToken);
  }

  return tokens;
}