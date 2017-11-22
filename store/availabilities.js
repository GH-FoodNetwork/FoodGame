//LOCAL DEFAULT STATE
let defaultState = {
    customerSlots: [0, 0, 0], //3 customer seats
    stations: [0, 0, 0, 0, 0, 0] //some yet-to-be determined number of stoves, etc.
}

//ACTION TYPES
const GET_AVAILABILITY = "GET_AVAILABILITY";
const SET_AVAILABILITY = "SET_AVAILABILITY";

//ACTION CREATORS
const getAvail = (isStation, index) => ({ type: GET_AVAILABILITY, isStation, index });
const setAvail = (isStation, index, value) => ({ type: GET_AVAILABILITY, isStation, index, value });

//THUNKS OR SAGAS
export function getAvailability(isStation, index) {
    return function getAvailThunk(dispatch) {
        return dispatch(getAvail(isStation, index));
    };
}

export function setAvailability(isStation, index, value) {
    return function setAvailThunk(dispatch) {
        return dispatch(setAvail(isStation, index, value));
    };
}

//REDUCER
export default function availabilitiesReducer(state = defaultState, action) {
    switch (action.type) {
        case GET_AVAILABILITY:
            return action.isStation ? state.stations[action.index] : state.customerSlots[action.index];
        case SET_AVAILABILITY:
            let arrayCopy;
            action.isStation ? arrayCopy = state.stations.slice(0) : state.customerSlots.slice(0);
            arrayCopy[action.index] = action.value;
            return Object.assign({}, state, { stations: arrayCopy });
        default:
            return state;
    }
}