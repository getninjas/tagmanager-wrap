import Calculator from '../src/calc';

describe('Calculator', () => {
  it('should add two numbers', () => {
    const calculator = new Calculator();
    const sum = calculator.add(1, 4);

    expect(sum).toBe(5);
  });

  it('should subtract tow numbers', () => {
    const calc = new Calculator();
    const sub = calc.subtract(4, 1);

    expect(sub).toBe(3);
  });
});
