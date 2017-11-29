import { ADD_RECIPE, UPDATE_RECIPE_STATE } from './recipes';
import { kitchenObjects } from '../views/gameplay';
import { gameStage } from '../main';
import { setup, objectAtlas } from '../atlases';
import { Container, addChild, Point } from 'pixi.js';

//Default state
const defaultState = {
  foodStack: new PIXI.Container(),
  chefFoodStack: new PIXI.Container(),
  sousChefHolding: false,
};

export const foodStack = defaultState.foodStack;
export const chefFoodStack = defaultState.chefFoodStack;
export const currentRecipes = [];

foodStack.position = new PIXI.Point(680, 360);
chefFoodStack.position = new PIXI.Point(150, 150);

//ACTION TYPE
const SET_SOUSCHEFHOLDING = 'SET_SOUSCHEFHOLDING';
const MOVE_FROMSOUSTOCHEF = 'MOVE_FROMSOUSTOCHEF';

//ACTION CREATOR
export const setSousChefHolding = holdBool => ({ type: SET_SOUSCHEFHOLDING, holdBool });
export const moveFromSousToChef = () => ({ type: MOVE_FROMSOUSTOCHEF });

window._spr = setup;

// REDUCER
export default function platterReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_RECIPE:
      //Side effect: Add ingredients from action.recipe.ingredients as sprites to gameStage, on souschef platter
      const platter = kitchenObjects.sousChef;

      for (let i = 0; i < action.recipe.ingredients.length; i++) {
        kitchenObjects[`${action.recipe.id}i${i}`] = setup(
          foodStack, action.recipe.ingredients[i],
          //TODO: scale location based on texture height
          { x: 0, y: 25 - (i * 25 /*action.recipe.ingredients[i].height)*/) },
          { x: 0.5, y: 0.5 },
        );
      }
      if (foodStack.parent)
        {foodStack.parent.removeChild(foodStack)};
      gameStage.addChild(foodStack);
      console.log('foodstack.children.length', foodStack.children.length);
      currentRecipes.push(action.recipe)
      return state;
    case SET_SOUSCHEFHOLDING:
      return Object.assign({}, state, { sousChefHolding: action.holdBool });
    case MOVE_FROMSOUSTOCHEF:
      /*let result = Object.assign({}, state,
        { foodStack: Object.assign(new PIXI.Container(), {children: []}),
     chefFoodStack: Object.assign(new PIXI.Container(),
      {children: state.chefFoodStack.children.concat(state.foodStack.children)
      })
    });
    result.chefFoodStack.position = new PIXI.Point(kitchenObjects.topChef.x, kitchenObjects.topChef.y);
    result.chefFoodStack.height = 100;
    result.chefFoodStack.width  = 100;
    return result;*/
      console.log('foodstack.children.length', foodStack.children.length);
      /*for (let i = 0; i < foodStack.children.length; i++) {
        console.log(i);
        chefFoodStack.addChild(foodStack.children[i]);
      }*/

      foodStack.parent.removeChild(foodStack);
      gameStage.addChild(foodStack);
      chefFoodStack.parent.removeChild(chefFoodStack);
      gameStage.addChild(chefFoodStack);
      return state;
    case UPDATE_RECIPE_STATE:
    //Map or filter to selectively remove ingredients? Or specify ingredient in action creator?
      return state; //state.map(recipe => (recipe.id === action.recipe.id ? action.recipe : recipe));
    default:
      return state;
  }
}
