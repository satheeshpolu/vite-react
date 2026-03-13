import { formatCurrency, formatDate, formatNumber, truncateText } from './formatters';

describe('formatCurrency', () => {
  it('formats a number as USD by default', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50');
  });

  it('formats a number with a different currency', () => {
    expect(formatCurrency(99.99, 'EUR', 'de-DE')).toContain('99,99');
  });

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats negative values', () => {
    expect(formatCurrency(-50)).toBe('-$50.00');
  });

  it('formats large numbers with commas', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00');
  });
});

describe('formatDate', () => {
  it('formats a date string to a readable format', () => {
    const result = formatDate('2024-01-15');
    expect(result).toBe('January 15, 2024');
  });

  it('formats a Date object', () => {
    const result = formatDate(new Date('2024-06-01'));
    expect(result).toBe('June 1, 2024');
  });

  it('accepts custom format options', () => {
    const result = formatDate('2024-01-15', { year: 'numeric', month: 'short' });
    expect(result).toBe('Jan 2024');
  });

  it('handles end-of-year dates', () => {
    const result = formatDate('2024-12-31');
    expect(result).toBe('December 31, 2024');
  });
});

describe('formatNumber', () => {
  it('formats a large number with commas', () => {
    expect(formatNumber(1000000)).toBe('1,000,000');
  });

  it('formats zero', () => {
    expect(formatNumber(0)).toBe('0');
  });

  it('formats a small number without commas', () => {
    expect(formatNumber(42)).toBe('42');
  });

  it('formats a number with thousands separator', () => {
    expect(formatNumber(12345)).toBe('12,345');
  });
});

describe('truncateText', () => {
  it('truncates text longer than maxLength', () => {
    expect(truncateText('Hello, World!', 5)).toBe('Hello...');
  });

  it('returns the original text when it fits within maxLength', () => {
    expect(truncateText('Hi', 10)).toBe('Hi');
  });

  it('returns exact-length text unchanged', () => {
    expect(truncateText('Hello', 5)).toBe('Hello');
  });

  it('truncates to zero characters', () => {
    expect(truncateText('Hello', 0)).toBe('...');
  });

  it('handles empty string', () => {
    expect(truncateText('', 10)).toBe('');
  });

  it('handles single-character truncation', () => {
    expect(truncateText('Hello World', 1)).toBe('H...');
  });
});
