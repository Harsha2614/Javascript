export const cart=[];

export function addtoCart(productId,selectorValue){
        let matchingItem;

          cart.forEach((cartItem)=>{
            if(productId===cartItem.id){
              matchingItem=cartItem;
            }
          });

          if(matchingItem){
            matchingItem.quantity+=selectorValue;

          }
          else{
            cart.push({
              id: productId,
              quantity:selectorValue
            });
          }
      };