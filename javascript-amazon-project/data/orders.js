const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
export const orders = storedOrders.filter((order) => {
  return order && order.id && Array.isArray(order.products);
});

saveToStorage();

export function addOrder(order){
    if (!order || !order.id || !Array.isArray(order.products)) {
      return;
    }

    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}
