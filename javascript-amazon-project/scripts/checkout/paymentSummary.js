import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOptionId } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import { addOrder, orders } from '../../data/orders.js';

let isPlacingOrder = false;

export function renderPaymentSummary(){
   let productPriceCents=0;
   let shippingPriceCents=0;
   let quantityall=0;
    cart.forEach(cartItem => {
        const productId = cartItem.id || cartItem.productId;
        const product=getProduct(productId);
        productPriceCents+=product.priceCents *cartItem.quantity;
        quantityall+=cartItem.quantity;
        const deliveryOption=getDeliveryOptionId(cartItem.deliveryOptionId);
        shippingPriceCents+=deliveryOption.priceCents;
  });

  let beforeTaxPrice=productPriceCents+shippingPriceCents;
  let tax=beforeTaxPrice *0.1;
  const totalOrderCost=beforeTaxPrice+tax;

  const paymentsummaryHtml=
  `
  <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${quantityall}):</div>
      <div class="payment-summary-money ">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-payment-summary-shipping">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(beforeTaxPrice)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-total">$${formatCurrency(totalOrderCost)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML= paymentsummaryHtml;
  const placeOrderButton = document.querySelector('.js-place-order');
  placeOrderButton
        .addEventListener('click', async() => {
          if (isPlacingOrder) {
            return;
          }

          isPlacingOrder = true;
          placeOrderButton.disabled = true;
          placeOrderButton.textContent = 'Placing your order...';

          try {
            const response = await fetch('https://supersimplebackend.dev/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                cart: cart.map((cartItem) => ({
                  productId: cartItem.id || cartItem.productId,
                  quantity: cartItem.quantity,
                  deliveryOptionId: cartItem.deliveryOptionId
                }))
              })
            });

            const order = await response.json();
            if (!response.ok) {
              console.log(order);
              return;
            }

            addOrder(order);
            console.log(orders);
           window.location.href = 'orders.html';
          } catch (error) {
            console.log('Unexpected error placing order.', error);
          } finally {
            isPlacingOrder = false;
            placeOrderButton.disabled = false;
            placeOrderButton.textContent = 'Place your order';
          }
    });
}
