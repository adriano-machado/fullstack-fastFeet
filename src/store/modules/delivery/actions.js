export function setActiveDelivery(delivery, deliveryNumber) {
  return {
    type: '@delivery/SET_ACTIVE_DELIVERY',
    payload: {
      delivery,
      deliveryNumber,
    },
  };
}
