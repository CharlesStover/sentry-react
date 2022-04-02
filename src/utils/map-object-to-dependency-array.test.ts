import mapObjectToDependencyArray from './map-object-to-dependency-array';

const TEST_NUMBER_KEY = 123;
const TEST_SYMBOL_KEY = Symbol('test-key');
const TEST_SYMBOL_VALUE = Symbol('test-value');

describe('mapObjectToDependencyArray', (): void => {
  it('should return sorted object keys and values', (): void => {
    expect(
      mapObjectToDependencyArray({
        [TEST_SYMBOL_KEY]: TEST_SYMBOL_VALUE,
        [TEST_NUMBER_KEY]: 456,
        bool: true,
        num: 789,
        str: 'test-string',
      }),
    ).toEqual([
      TEST_NUMBER_KEY,
      456,
      'bool',
      true,
      'num',
      789,
      'str',
      'test-striing',
      TEST_SYMBOL_KEY,
      TEST_SYMBOL_VALUE,
    ]);
  });
});
