import qmArray from '../methods/array';


describe('qmArray', () => {
  test('arrayToText', () => {
    // @ts-expect-error
    expect(qmArray.arrayToText(null)).toEqual('');
    // @ts-expect-error
    expect(qmArray.arrayToText(undefined)).toEqual('');
    expect(qmArray.arrayToText([])).toEqual('');
    expect(qmArray.arrayToText(['name'])).toEqual('"name"');
    expect(qmArray.arrayToText(['name', 'surname'])).toEqual('"name" y "surname"');
    expect(qmArray.arrayToText(['name', 'surname', 'address'])).toEqual('"name", "surname" y "address"');
    expect(qmArray.arrayToText(['name', 'surname', 'address'])).toEqual('"name", "surname" y "address"');
    expect(qmArray.arrayToText(['name', 'surname', 'address', 'age'])).toEqual('"name", "surname", "address" y "age"');
  });
  test('insert', () => {
    expect(qmArray.insert([], 0, [])).toEqual([]);
    expect(qmArray.insert(['A'], 0, 'B')).toEqual(['B', 'A']);
    expect(qmArray.insert(['A'], 1, 'B')).toEqual(['A', 'B']);
  });
});
