// ACTION TYPE
export const ADD_RECIPE = 'ADD_RECIPE';
export const REMOVE_RECIPE = 'REMOVE_RECIPE';
export const UPDATE_RECIPE_STATE = 'UPDATE_RECIPE_STATE';

// ACTION CREATOR
export const addRecipe = recipe => ({ type: ADD_RECIPE, recipe });
export const removeRecipe = id => ({ type: REMOVE_RECIPE, id });
export const updateRecipeState = recipeId => ({
  type: UPDATE_RECIPE_STATE,
  recipeId,
});

// REDUCER
export default function recipeReducer(state = [], action) {
  switch (action.type) {
    case ADD_RECIPE:
      return [...state, action.recipe];
    case REMOVE_RECIPE:
      return state.filter(recipe => recipe.id !== action.id);
    case UPDATE_RECIPE_STATE:
      console.log('recipe state is updated!');
      return state.map((recipe) => {
        if (recipe.currentState === recipe.steps.length - 1) {
          recipe.currentState = 0;
        }
        if (recipe.currentState < recipe.steps.length - 1) {
          recipe.currentState++;
        }
        return recipe;
      });
    default:
      return state;
  }
}
