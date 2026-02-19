import {validDeliveryOption} from './deliveryOptions.js';

class Cart{

     cartItems=undefined;
     localStorageKey=undefined;

  loadFromStorage (){
  this.cartItems=JSON.parse(localStorage.getItem(this.localStorageKey));


  if(!this.cartItems){
  this.cartItems=
[{
  id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:2,
  deliveryOptionId:'1'

},{
  id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:1,
  deliveryOptionId:'2'

            }];

        }
    }

      savetoStorage(){
  localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
}


addtoCart(productId,selectorValue=1){
        let matchingItem;

          this.cartItems.forEach((cartItem)=>{
            if(productId===cartItem.id){
              matchingItem=cartItem;
            }
          });

          if(matchingItem){
            matchingItem.quantity+=selectorValue;

          }
          else{
            this.cartItems.push({
              id: productId,
              quantity:selectorValue,
              deliveryOptionId:'1'
            });
          }
           this.savetoStorage();
      }


       removefromCart(productId){
 let updatedCart=[];
  this.cartItems.forEach((item)=>{
    if(item.id !=productId){
      updatedCart.push(item);
    }
  })
  this.cartItems=updatedCart;
  this.savetoStorage();
}


updateDeliveryOption(productId,deliveryOptionId){
        let matchingItem;

          this.cartItems.forEach((cartItem)=>{
            if(productId===cartItem.id){
              matchingItem=cartItem;
            }
          });

            if (!matchingItem) {
                  return;
            }

          if (!validDeliveryOption(deliveryOptionId)) {
                   return;
            }
 matchingItem.deliveryOptionId=deliveryOptionId;

 this.savetoStorage();
  
}


calculateCartQuantity() {
  let cartQuantity = 0;

  this.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

updateQuantity(productId, newQuantity) {
  let matchingItem;

  this.cartItems.forEach((cartItem) => {
    if (productId === cartItem.id) {   // ✅ FIXED
      matchingItem = cartItem;
    }
  });

  if (!matchingItem) return; // safety check

  matchingItem.quantity = newQuantity;

  this.savetoStorage();
   }




}

const cart= new Cart();
const businessCart= new Cart();

cart.localStorageKey='cart-oop';
businessCart.localStorageKey='cart-business';


cart.loadFromStorage();
businessCart.loadFromStorage();



console.log(cart);
console.log(businessCart);




