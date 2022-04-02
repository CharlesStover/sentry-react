import sortRecordKeys from './sort-record-keys';

describe('sortRecordKeys', (): void => {
  it('should sort numbers', (): void => {
    expect(sortRecordKeys(1, 2)).toBe(-1);
    expect(sortRecordKeys(2, 1)).toBe(1);
    expect(sortRecordKeys(1, 1)).toBe(0);
  });

  it('should sort strings', (): void => {
    expect(sortRecordKeys('a', 'b')).toBe(-1);
    expect(sortRecordKeys('b', 'a')).toBe(1);
    expect(sortRecordKeys('a', 'a')).toBe(0);
  });

  it('should sort symbols', (): void => {
    expect(sortRecordKeys(Symbol('a'), Symbol('b'))).toBe(-1);
    expect(sortRecordKeys(Symbol('b'), Symbol('a'))).toBe(1);
    expect(sortRecordKeys(Symbol('a'), Symbol('a'))).toBe(0);
  });
});
