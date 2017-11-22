// ACTION TYPE
const ADD_TO_QUEUE = 'ADD_TO_QUEUE';
const DEQUEUE = 'DEQUEUE';

//ACTION CREATOR
const addToQueue = destination => ({ type: ADD_TO_QUEUE, destination });
const dequeue = () => ({ type: DEQUEUE });

// onClick functions
export function addDestination(destination) {
  return function addDestThunk(dispatch) {
    return dispatch(addToQueue(destination));
  };
}

export const removeDestination = () => dispatch => {
  dispatch(dequeue());
};

// REDUCER
export default function destinationReducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_QUEUE:
      return [...state, action.destination];
    case DEQUEUE:
      return state.slice(1);
    default:
      return state;
  }
}
