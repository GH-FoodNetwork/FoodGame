import store from './index';
import { kitchenObjects } from '../views/gameplay';
import { stage } from '../main';
import { setup } from '../atlases';

const customerAtlas = ['customer1.png', 'customer2.png', 'customer3.png'];
const moneySprite = '../public/images/gold.gif';

function getFirstAvailSlot() {
  for (let i = 0; i < store.state.customerSlots.length; i++) {
    if (store.state.customerSlots[i]) {
      return i;
    }
  }
  return -1;
}

const customerCreator = () => {
  const slotty = getFirstAvailSlot();
  if (slotty == -1) return false;
  return {
    sprite: `../public/images/${
      customerAtlas[Math.floor(Math.random() * (customerAtlas.length - 1 - 0))]
    }`,
    customerSlot: slotty,
    desiredDish: 'Jollof Rice',
    waitTime: Math.floor(Math.random() * (10 - 5)) + 5,
  };
};

//ACTION TYPE
const GENERATE_CUSTOMER = 'GENERATE_CUSTOMER';
const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER';

//ACTION CREATOR
const generateCustomer = () => ({ type: 'GENERATE_CUSTOMER' });
const removeCustomer = id => ({ type: 'REMOVE_CUSTOMER', id });

//THUNK
export function addCustomer() {
  return function customerThunk(dispatch) {
    return dispatch(generateCustomer());
  };
}

export function deleteCustomer(id) {
  return function customerThunk(dispatch) {
    return dispatch(removeCustomer(id));
  };
}

//REDUCER
export default function customerReducer(state = [], action) {
  switch (action.type) {
    case GENERATE_CUSTOMER:
      const custy = customerCreator();
      if (!custy) return state;
      setup(
        custy.sprite,
        1,
        1, //selected square from sheet
        3,
        4, //proportion of sheet
        { x: 15, y: custy.customerSlot * (stage.height / store.state.customerSlots.length) }, //placement of sprite on stage
        { x: 3.5, y: 3.5 },
      ); //scale
      return [...state, custy];
    case REMOVE_CUSTOMER:
      const slotty = store.state.customers[action.id].customerSlot;
      if (!kitchenObjects.sideCounter) {
        console.log("Can't find sideCounter to calculate where gold x position should be!");
      } else {
        setup(
          moneySprite,
          1,
          1, //selected square from sheet
          3,
          4, //proportion of sheet
          {
            x: kitchenObjects.sideCounter.x,
            y: slotty * (stage.height / store.state.customerSlots.length),
          }, //placement of sprite on stage
          { x: 3.5, y: 3.5 },
        ); //scale
      }
      return state.filter(customer => customer.id !== action.id);
    default:
      return state;
  }
}
