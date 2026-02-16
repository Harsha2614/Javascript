import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite : FormatCurrency',() =>{
    it(' From Cents to dollors',()=>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('Works with 0',() =>{
        expect(formatCurrency(0)).toEqual('0.00');
    })
    it('Round up to the nearest cents',() =>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })

      it('test for 2000.4', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });

      it('works with negative numbers', () => {
    expect(formatCurrency(-500)).toEqual('-5.00');
  });

});
