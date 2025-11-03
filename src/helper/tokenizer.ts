export function tokenize(expression: string): string[] {
  const tokens: string[] = [];
  let currToken = ''

  // Method to push for number type tokens
  function pushCurrentToken() {
    if (currToken !== '') {
      // Throws error for the multiple decimal points
      if (isNaN(parseFloat(currToken)) || (currToken.match(/\./g) || []).length > 1) {
        throw new Error(`Invalid number: ${currToken}`);
      }
      tokens.push(currToken);
      currToken = '';
    }
  }


  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (char === ' ') {
      pushCurrentToken();
      continue;
    }
    // Arithmetic symbols
    if (/[\+\*\/\^\%\(\)]/.test(char)) {
      pushCurrentToken() // push the number tokens in the stack
      tokens.push(char);
      // case where a number can be negative or '-' as operation
    } else if (char === '-') {
      pushCurrentToken();
      // if its the start of exp., ( or have any opp. it will consider it as -ve number. 
      if (tokens.length === 0 || /[\+\-\*\/\^\%\(]/.test(tokens[tokens.length - 1])) {
        currToken += char;
      } else {
        tokens.push(char);
      }
    } else {
      currToken += char;
    }
  }

  pushCurrentToken() // push any remaining numbers


  // todo: there should not be consecutive opp.  
  return tokens;
}