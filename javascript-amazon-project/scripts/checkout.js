import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts ,loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";

//import "../data/backend-practice.js";

//import '../data/cart-class.js';

async function loadPage(){    //async makes a function to return a promise

    try{
        // throw 'error1'; //this manually throws the error a=.Hence the try block code skips
        await loadProductsFetch();  //await lets us wait for a promise to finish before going to the nextline and lets us write asynchronus code like a normal code

    await new Promise((resolve,reject)=>{   //reject is a function that creates error in the future
        //throw 'error2' //does not load cart
        loadCart(()=>{
           //reject('error3');
            resolve();
        });
    });
    }
    catch{
        console.log("unexpected Eror occured");
    }

    renderOrderSummary();
    renderPaymentSummary();

}

loadPage();
 //await lets us wait for a promise to finish before going to the nextline 

/*
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

*/

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

