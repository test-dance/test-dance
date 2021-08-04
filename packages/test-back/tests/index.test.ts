import { sayHello } from '../src';

describe('test', () => {
  test('test1', () => {
    expect(sayHello()).toStrictEqual(1);
  });
});