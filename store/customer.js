import store, { addMoney } from './index';
import { Graphics } from 'pixi.js';
import { kitchenObjects } from '../views/gameplay';
import { stage, gameStage } from '../main';
import { setup, textSetup, objectAtlas } from '../atlases';

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
    id: Math.random(),
    sprite: customers[Math.floor(Math.random() * (3 - 0)) + 0],
    customerSlot: slotty,
    desiredDish: 'Jollof Rice',
    waitTime: Math.floor(Math.random() * (20 - 10)) + 10,
    satisfied: false,
    interval: null,
  };
};

//ACTION TYPE
const GENERATE_CUSTOMER = 'GENERATE_CUSTOMER';
const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER';
const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';

//ACTION CREATOR
export const generateCustomer = () => ({ type: 'GENERATE_CUSTOMER' });
export const removeCustomer = id => ({ type: 'REMOVE_CUSTOMER', id });
export const updateCustomer = id => ({ type: 'UPDATE_CUSTOMER', id });

//REDUCER
export default function customerReducer(state = [], action) {
  switch (action.type) {
    case GENERATE_CUSTOMER:
      const custy = customerCreator();
      if (!custy) return state;

      custy.sprite = setup(
        gameStage,
        custy.sprite,
        { x: 30, y: custy.customerSlot * 125 },
        { x: 3.5, y: 3.5 },
      );

      const circle = new Graphics();
      circle.beginFill(0xeeaaff);
      circle.drawCircle(0, 0, 10);
      circle.endFill();
      circle.x = 20;
      circle.y = 0;
      custy.sprite.addChild(circle);

      const custText = textSetup(
        gameStage,
        custy.desiredDish,
        { x: 20, y: -4 },
        {
          fontSize: '12px',
          dropShadow: true,
          dropShadowColor: 'white',
          dropShadowDistance: 2,
        },
      );
      custy.sprite.addChild(custText);
      custText.scale.x = custText.scale.x / 3.5;
      custText.scale.y = custText.scale.y / 3.5;

      const custTime = textSetup(
        gameStage,
        custy.waitTime,
        { x: 20, y: 2 },
        {
          fontSize: '24px',
          dropShadow: true,
          dropShadowColor: 'white',
          dropShadowDistance: 2,
        },
      );
      custy.sprite.addChild(custTime);
      custTime.scale.x = custTime.scale.x / 3.5;
      custTime.scale.y = custTime.scale.y / 3.5;

      //let timeleft = custy.waitTime;
      custy.interval = setInterval(() => {
        custy.waitTime--;
        custTime.text = custy.waitTime;
        if (custy.waitTime <= 0) {
          clearInterval(custy.interval);
          store.dispatch(removeCustomer(custy.customerSlot));
        }
      }, 1000);

      console.log('time left', custy.waitTime);

      return [...state, custy];
    case UPDATE_CUSTOMER:
      return state.map((cust) => {
        console.log('custSlot', cust.customerSlot);
        console.log('id', action.id);
        if (cust.customerSlot === action.id) {
          cust.satisfied = true;
        }
        return cust;
      });
    case REMOVE_CUSTOMER:
      let gold;
      const [leavingCust] = state.filter(cust => cust.customerSlot === action.id);
      console.log('leaving customer -->', leavingCust);
      const slot = leavingCust.customerSlot;
      const { x, y } = kitchenObjects.topChef;
      const timeleft = leavingCust.waitTime;
      console.log('time left', leavingCust.waitTime);
      console.log('YOU GOT THE TIME', `${x}, ${y}`);
      //if (x === 150 && (y === 124.5 || y === 250.5 || y === 375.5)) {
      if (leavingCust.satisfied) {
        gold = setup(
          gameStage,
          objectAtlas.gold,
          {
            x: 90,
            y: slot * 125,
          }, //placement of sprite on stage
        ); //scale

        let pay;

        if (leavingCust.waitTime > 0) {
          pay = 10 * leavingCust.waitTime;
        } else {
          pay = 10;
        }
        leavingCust.waitTime = 0;
        clearInterval(leavingCust.interval);
        const { money } = kitchenObjects;

        function clickMoney() {
          store.dispatch(addMoney(pay));
          gold.destroy();
          const globalState = store.getState();
          console.log('money?', globalState.money);
          money.text = `$${globalState.money}`;
        }

        gold.interactive = true;
        gold.buttonMode = true;
        gold.on('pointerdown', clickMoney);
      }

      leavingCust.sprite.scale.x = -leavingCust.sprite.scale.x;
      setTimeout(() => {
        leavingCust.sprite.destroy();
      }, 1000);
      console.log('EXISTENCE?? -->', leavingCust);
      // const storeState = store.getState();
      // console.log('state  ----------->', storeState);

      return state.filter(customer => customer.customerSlot !== action.id);
    default:
      return state;
  }
}
