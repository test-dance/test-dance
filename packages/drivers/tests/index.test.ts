import { sum } from '../src';

describe('test', () => {
  test('test1', () => {
    expect(sum(2, 2)).toStrictEqual(4);
  });

  test('test2', () => {
    expect(sum(2, 3)).toStrictEqual(5);
  });
});
