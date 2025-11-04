import { evaluate } from '../../helper/evaluate';
import { describe, it, expect } from 'vitest';

describe('evaluate', () => {
  it('should return an empty string for an empty expression', () => {
    expect(evaluate('')).toBe('');
  });

  it('should correctly evaluate simple addition', () => {
    expect(evaluate('1 + 2')).toBe('3');
  });

  it('should correctly evaluate simple subtraction', () => {
    expect(evaluate('3 - 1')).toBe('2');
  });

  it('should correctly evaluate simple multiplication', () => {
    expect(evaluate('2 * 3')).toBe('6');
  });

  it('should correctly evaluate simple division', () => {
    expect(evaluate('6 / 2')).toBe('3');
  });

  it('should handle operator precedence', () => {
    expect(evaluate('1 + 2 * 3')).toBe('7');
  });

  it('should handle parentheses', () => {
    expect(evaluate('(1 + 2) * 3')).toBe('9');
  });

  it('should handle multiple sets of parentheses', () => {
    expect(evaluate('(1 + 2) * (3 + 1)')).toBe('12');
  });

  it('should handle nested parentheses', () => {
    expect(evaluate('10 * (2 + (6 / 3))')).toBe('40');
  });

  it('should handle power operator', () => {
    expect(evaluate('2 ^ 3')).toBe('8');
  });

  it('should handle modulo operator', () => {
    expect(evaluate('7 % 3')).toBe('1');
  });

  it('should handle expressions with decimal numbers', () => {
    expect(evaluate('1.5 + 2.5')).toBe('4');
  });

  it('should handle expressions with multi-digit numbers', () => {
    expect(evaluate('10 + 20')).toBe('30');
  });

  it('should throw an error for invalid expressions', () => {
    expect(() => evaluate('1 +')).toThrowError('Invalid expression');
  });

  it('should throw an error for division by zero', () => {
    expect(evaluate('1 / 0')).toBe('Infinity');
  });
});
