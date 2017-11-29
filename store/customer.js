import store from './index';
import { Graphics } from 'pixi.js';
import { kitchenObjects } from '../views/gameplay';
import { stage, gameStage } from '../main';
import { setup, textSetup, objectAtlas } from '../atlases';


// kitchenObjects.coolCustomer = setup(
//     gameStage,
//     objectAtlas.customer2,
//     { x: 30, y: 50 },
//     { x: 3.5, y: 3.5 },
//   );

// const { customer1, customer2, customer3 } = objectAtlas;
// const newCustomer =

const moneySprite = '../public/images/gold.gif';

//let state = store.getState();

function getFirstAvailSlot() {
  const state = store.getState();
  if (state.customer.length < 3) {
    return state.customer.length + 1;
  }
  return -1;
}

const customerCreator = () => {
  const customers = [objectAtlas.customer1, objectAtlas.customer2, objectAtlas.customer3];
  const slotty = getFirstAvailSlot();
  if (slotty == -1) return false;
  return {
    sprite: objectAtlas.customer2,
    customerSlot: slotty,
    desiredDish: 'Jollof Rice',
    waitTime: Math.floor(Math.random() * (10 - 5)) + 5,
  };
};

//ACTION TYPE
const GENERATE_CUSTOMER = 'GENERATE_CUSTOMER';
const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER';

//ACTION CREATOR
export const generateCustomer = () => ({ type: 'GENERATE_CUSTOMER' });
export const removeCustomer = id => ({ type: 'REMOVE_CUSTOMER', id });

//THUNK
// export function addCustomer() {
//   return function customerThunk(dispatch) {
//     return dispatch(generateCustomer());
//   };
// }

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
      console.log("customer", custy)
      console.log("sprite", objectAtlas.customer1)
      if (!custy) return state;
    //   setup(
    //   stage,
    //   custy.sprite,
    //   { x: 30, y: 50 },
    //   { x: 3.5, y: 3.5 },
    // );
    const circle = new Graphics();
    circle.beginFill(0xeeaaff);
    circle.drawCircle(0, 0, 35);
    circle.endFill();
    circle.x = 90;
    circle.y = custy.customerSlot * 100 - 10;
    gameStage.addChild(circle);

    const newCust = setup(
    gameStage,
    custy.sprite,
    { x: 30, y: custy.customerSlot * 100 },
    { x: 3.5, y: 3.5 },
  );
    const custText = textSetup(
    gameStage,
    custy.desiredDish,
    { x: 90, y: (custy.customerSlot * 100) - 20 },
    { fontSize: '12px', dropShadow: true, dropShadowColor: 'white', dropShadowDistance: 2 },
  );

    let custTime = textSetup(
    gameStage,
    custy.waitTime,
    { x: 90, y: (custy.customerSlot * 100) },
    { fontSize: '24px', dropShadow: true, dropShadowColor: 'white', dropShadowDistance: 2 },
  );

    let timeleft = custy.waitTime;
    let downloadTimer = setInterval(() => {
    timeleft--;
    custTime.text = timeleft;
    if (timeleft <= 0)
        clearInterval(downloadTimer);
    }, 1000);


      // setup(gameStage,
      //   custy.sprite,
      //   1,
      //   1, //selected square from sheet
      //   3,
      //   4, //proportion of sheet
      //   { x: 15, y: custy.customerSlot * (stage.height / state.length) }, //placement of sprite on stage
      //   { x: 3.5, y: 3.5 },
      // ); //scale
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
            y: slotty * (stage.height / state.length),
          }, //placement of sprite on stage
          { x: 3.5, y: 3.5 },
        ); //scale
      }
      return state.filter(customer => customer.id !== action.id);
    default:
      return state;
  }
}
