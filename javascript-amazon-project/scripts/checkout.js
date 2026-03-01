import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts ,loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";

//import "../data/backend-practice.js";

//import '../data/cart-class.js';


Promise.all([
  loadProductsFetch(),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
]).then((values)=>{
    console.log(values)
    renderOrderSummary();
    renderPaymentSummary();
})



/*
new Promise((resolve)=>{                        //promise() used to run function immediately
    loadProducts(()=>{
        resolve('value1');                      //resolve lets us control when to go to next step
    });

}).then((value)=>{
    console.log(value);  //loads the value that is used in resolve 
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    });

}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/


/*
//these are all callbacks
loadProducts(()=>{
    loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary();
    })
});
*/

