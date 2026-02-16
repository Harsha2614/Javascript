
import {addtoCart, cart,loadFromStorage,removefromCart} from '../../data/cart.js';
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';

describe('test suite : addtoCart',()=>{
    beforeEach(()=>{
         spyOn(localStorage,'setItem');

    })
    it('adding an exiting product to the cart',()=>{
       
         spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                id:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                deliveryOptionId:'1'

            }]);

        });
        loadFromStorage();

         addtoCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cartvalue',JSON.stringify(cart));
    
    });

    it('adding a new product to the cart',()=>{
        
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);

        });
        loadFromStorage();
        addtoCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cartvalue',JSON.stringify(cart));        
    });
})

describe('test suite : removefromCart',()=>{
    beforeEach(()=>{

         spyOn(localStorage,'setItem');
   
        
    })


    it('remove productId that is in the cart',()=>{

       spyOn(localStorage,'getItem').and.callFake(()=>{
       return JSON.stringify([{
                id:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                deliveryOptionId:'1'

            }]);
    });
    loadFromStorage();

    removefromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(0)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartvalue',JSON.stringify([]))

});

    it('remove productId that is not in the cart',()=>{

      spyOn(localStorage,'getItem').and.callFake(()=>{
       return JSON.stringify([{
                id:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                deliveryOptionId:'1'

            }]);
    });
    loadFromStorage();

    removefromCart('does-not-exist');
    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartvalue',JSON.stringify([{
         id:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
         quantity:1,
         deliveryOptionId:'1'

    }]));


   

    });


})