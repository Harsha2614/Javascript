import {
  cart,
  removefromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption
} from '../../data/cart.js'
import {products,getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';

import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';

 // External libraries should be imported as modules to avoid the naming conflict

import {deliveryOptions,getDeliveryOptionId,calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';


// hello();

// const today=dayjs();
// const deliverydate=today.add(7,'days');
// console.log(today.format('dddd,MMMM D'))
// console.log(deliverydate.format('dddd,MMMM D'))

export function renderOrderSummary(){



  let cartSummaryHTML='';

  cart.forEach((cartItem)=>{
      const productId=cartItem.id;
        const matchingproduct=getProduct(productId);
       

      const deliveryOptionId=cartItem.deliveryOptionId;
      const deliveryOption=getDeliveryOptionId(deliveryOptionId);

      const datestring=calculateDeliveryDate(deliveryOption);

      cartSummaryHTML+=
      `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingproduct.id}">
              <div class="delivery-date">
                Delivery date: ${datestring}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingproduct.image}">

                <div class="cart-item-details">
                  <div class="product-name js-product-name-${matchingproduct.id}">
                    ${matchingproduct.name}
                  </div>
                  <div class="product-price js-product-price-${matchingproduct.id}">
                  $${formatCurrency(matchingproduct.priceCents)}
                  </div>
                  <div class="product-quantity js-product-quantity-${matchingproduct.id}">
                    <span>
                      Quantity: <span class="quantity-label  js-quantity-label-${matchingproduct.id}">${cartItem.quantity}</span>
                    </span>
                    <input class="quantity-input  js-quantity-input-${matchingproduct.id}">
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingproduct.id}">
                      Update
                    </span>
                    <span class="save-quantity-link link-primary js-save-link"
                data-product-id="${matchingproduct.id}">
                Save
              </span>
                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingproduct.id}" data-product-id="${matchingproduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingproduct,cartItem)}

                </div>
              </div>
            </div>`


  });

  function deliveryOptionsHTML(matchingproduct,cartItem){
    let  html='';
    
    deliveryOptions.forEach((deliveryOption)=>{
     
      const dateString=calculateDeliveryDate(deliveryOption);
      const priceString=deliveryOption.priceCents === 0 ? 'FREE' : `$ ${formatCurrency(deliveryOption.priceCents)} -`;
      let isChecked = deliveryOption.id===cartItem.deliveryOptionId;
      html+= `             
        <div class="delivery-option js-delivery-option js-delivery-option-${matchingproduct.id}-${deliveryOption.id}" data-product-id="${matchingproduct.id}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
        ${isChecked ? 'checked': ''}
          class="delivery-option-input js-delivery-option-input-${matchingproduct.id}-${deliveryOption.id}"
          name="delivery-option-${matchingproduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
    })

    return html;
  }


  document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
  .forEach((link)=>{
      link.addEventListener('click',()=>{
          const productId=link.dataset.productId;
          removefromCart(productId);
          

        renderOrderSummary();
        renderPaymentSummary();
        
        updateCartQuantity();

      });
  });




function updateCartQuantity(){
    const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;

  }
  
  updateCartQuantity();

 
  document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.add('is-editing-quantity');

        
      });
    });

    document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        
        const quantityInput = document.querySelector(
          `.js-quantity-input-${productId}`
        );
        const newQuantity = Number(quantityInput.value);
        if (newQuantity < 0 || newQuantity >= 1000) {
          alert('Quantity must be at least 0 and less than 1000');
          return;
        }
        updateQuantity(productId, newQuantity);
          const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.remove('is-editing-quantity');

        const quantityLabel = document.querySelector(
          `.js-quantity-label-${productId}`
        );
        quantityLabel.innerHTML = newQuantity;

        updateCartQuantity();
        renderPaymentSummary();

      });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
      element.addEventListener('click',()=>{
        const {productId,deliveryOptionId}=element.dataset;
        updateDeliveryOption(productId,deliveryOptionId)
        renderOrderSummary();
        renderPaymentSummary();
        
      });
      
    });
}

export const cartQuantityexport = calculateCartQuantity();