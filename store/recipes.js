// ACTION TYPE
const ADD_RECIPE = 'ADD_RECIPE';
const REMOVE_RECIPE = 'REMOVE_RECIPE';
const UPDATE_RECIPE_STATE = 'UPDATE_RECIPE_STATE';

//ACTION CREATOR
const addRecipe = recipe => ({ type: ADD_RECIPE, recipe });
const removeRecipe = id => ({ type: REMOVE_RECIPE, id });
const updateRecipeState = recipe => ({ type: UPDATE_RECIPE_STATE, recipe });

// THUNK
export function addOneRecipe(recipe) {
  return function addRecipeThunk(dispatch) {
    return dispatch(addRecipe(recipe));
  };
}

export const removeOneRecipe = id => (dispatch) => {
  dispatch(removeRecipe(id));
};

export const updateOneRecipe = (id, recipe) => (dispatch) => {
  if (id === recipe.id) {
    dispatch(updateRecipeState(recipe));
  }
};

// REDUCER
export default function recipeReducer(state = [], action) {
  switch (action.type) {
    case ADD_RECIPE:
      return [...state, action.recipe];
    case REMOVE_RECIPE:
      return state.filter(recipe => recipe.id !== action.id);
    case UPDATE_RECIPE_STATE:
      return state.map(recipe => (recipe.id === action.recipe.id ? action.recipe : recipe));
    default:
      return state;
  }
}
