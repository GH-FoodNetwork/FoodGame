// ACTION TYPE
const ADD_MONEY = 'ADD_MONEY';
const DECREASE_MONEY = 'DECREASE_MONEY';

// ACTION CREATOR
export const addMoney = (money) => ({type: ADD_MONEY, money})
const decreaseMoney = (money) => ({type: DECREASE_MONEY, money})


// REDUCER
export default function moneyReducer(state = 0, action) {
  switch (action.type) {
    case ADD_MONEY:
      return state + action.money;
    case DECREASE_MONEY:
      return state - action.money;
    default:
      return state;
  }
}
