import { expect } from 'chai';

function sum(a: number, b: number): number {
  return a + b;
}


describe('sum', () => {
  it('sum test', () => {
    expect(sum(1, 1)).to.equal(2);
    expect(sum(1, 1)).to.not.equal('귀요미');
  });
});