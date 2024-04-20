import { csrfFetch } from './csrf';


const GET_SPOTS = 'spots/GET_SPOTS';
const GET_SPECIFIC_SPOT = 'spots/SET_SPECIFIC_SPOT';

export const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

export const getSpecificSpot = (spot) => ({
    type: GET_SPECIFIC_SPOT,
    spot,
});

export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spotsData = await response.json();
        // console.log('get all spots:', spotsData);

        dispatch(getSpots(spotsData));
        return spotsData
    }
}


export const fetchSpecificSpot = (spotId) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const spot = await response.json()
        // console.log('get one spot:', spot);
        dispatch(getSpecificSpot(spot))
    }
};

const spotsReducer = (state = {}, action) => {
  switch (action.type) {
      case GET_SPOTS:{
          const newState = {...state};
              action.spots.Spots.forEach(spot => newState[spot.id] = spot);
          return newState;
      }
      case GET_SPECIFIC_SPOT:{
        return {...state, [action.spot.id]: action.spot };
    }
  default:
    return state;
  }
};
export default spotsReducer
