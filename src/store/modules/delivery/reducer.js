import produce from 'immer';

const INITIAL_STATE = {
  delivery: null,
  deliveryNumber: null,
};
export default function delivery(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@delivery/SET_ACTIVE_DELIVERY': {
        draft.delivery = action.payload.delivery;
        draft.deliveryNumber = action.payload.deliveryNumber;
        break;
      }

      default:
    }
  });
}
