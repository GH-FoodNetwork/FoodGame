// ACTION TYPE
const ADD_TO_QUEUE = 'ADD_TO_QUEUE';

//ACTION CREATOR
const addToQueue = destination => ({ type: ADD_TO_QUEUE, destination });

// onClick functions
export const addDestination = destination => dispatch => {
  dispatch(addToQueue(destination));
};

// REDUCER
export default function destinationReducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_QUEUE:
      return [...state, action.destination];
    default:
      return state;
  }
}
