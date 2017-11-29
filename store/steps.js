const dishSteps = ['mixing', 'frying', 'serving'];

// ACTION TYPE
const DEQUEUE_STEP = 'DEQUEUE_STEP';

// ACTION CREATOR
export const dequeueStep = () => ({ type: DEQUEUE_STEP });


// REDUCER
export default function stepsReducer(state = dishSteps, action) {
  switch (action.type) {
    case DEQUEUE_STEP:
      return state.slice(1);
    default:
      return state;
  }
}
