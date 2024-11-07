import { formatCatNames } from './utils';

describe('formatCatNames', () => {
  it('should format a single cat name correctly', () => {
    expect(formatCatNames(['Fluffy'])).toBe('Fluffy');
  });

  it('should format two cat names correctly', () => {
    expect(formatCatNames(['Fluffy', 'Mittens'])).toBe('Fluffy and Mittens');
  });

  it('should format multiple cat names correctly', () => {
    expect(formatCatNames(['Fluffy', 'Mittens', 'Whiskers'])).toBe(
      'Fluffy, Mittens, and Whiskers',
    );
  });
});
