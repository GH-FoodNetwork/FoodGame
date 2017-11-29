// ACTION TYPE
export const ADD_RECIPE = 'ADD_RECIPE';
export const REMOVE_RECIPE = 'REMOVE_RECIPE';
export const UPDATE_RECIPE_STATE = 'UPDATE_RECIPE_STATE';

// ACTION CREATOR
export const addRecipe = recipe => ({ type: ADD_RECIPE, recipe });
export const removeRecipe = id => ({ type: REMOVE_RECIPE, id });
export const updateRecipeState = recipe => ({
  type: UPDATE_RECIPE_STATE,
  recipe,
});

// REDUCER
export default function recipeReducer(state = [], action) {
  switch (action.type) {
    case ADD_RECIPE:
      return [...state, action.recipe];
    case REMOVE_RECIPE:
      return state.filter(recipe => recipe.id !== action.id);
    case UPDATE_RECIPE_STATE:
      return state.map((recipe) => {
        if (recipe.id === action.recipe.id) {
          action.recipe.currentState++;
          return action.recipe;
        } else {
          return recipe;
        }
      });
    default:
      return state;
  }
}
