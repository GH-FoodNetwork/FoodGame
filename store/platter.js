import { Container } from 'pixi.js';
import { ADD_RECIPE, UPDATE_RECIPE_STATE } from './recipes';
import { kitchenObjects } from '../views/gameplay';
import { gameStage } from '../main';
import { setup } from '../atlases';

// Default state
const defaultState = {
  foodStack: new Container(),
  sousChefHolding: false,
};

// ACTION TYPE
const SET_SOUSCHEFHOLDING = 'SET_SOUSCHEFHOLDING';

// ACTION CREATOR
export const setSousChefHolding = holdBool => ({ type: SET_SOUSCHEFHOLDING, holdBool });

// REDUCER
export default function platterReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_RECIPE:
      // Side effect: Add ingredients from action.recipe.ingredients as sprites to gameStage, on souschef platter
      const platter = kitchenObjects.sousChef;
      const newFoodStack = new Container();
      for (let i = 0; i < action.recipe.ingredients.length; i++) {
        kitchenObjects[`${action.recipe.id}i${i}`] = setup(
          newFoodStack, action.recipe.ingredients[i],
          // TODO: scale location based on texture height
          { x: platter.x - 20, y: platter.y - 30 - (i * 25 /* action.recipe.ingredients[i].height */) },
          { x: 0.5, y: 0.5 },
        );
      }
      return Object.assign({}, state, { foodStack: Object.assign(new Container(), { children: state.foodStack.children.concat(newFoodStack.children) }) });
    case SET_SOUSCHEFHOLDING:
      return Object.assign({}, state, { sousChefHolding: action.holdBool });
    case UPDATE_RECIPE_STATE:
    // Map or filter to selectively remove ingredients? Or specify ingredient in action creator?
      return state; // state.map(recipe => (recipe.id === action.recipe.id ? action.recipe : recipe));
    default:
      return state;
  }
}
