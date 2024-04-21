import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/GET_SPOTS';

export const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

export const getAllSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
        const spotsData = await res.json();
        dispatch(getSpots(spotsData));
        return spotsData
    }else{
    const error = await res.json();
    console.log(error);
    return error
    }
}

const spotsReducer = (state = {}, action) => {
  switch (action.type) {
      case GET_SPOTS:{
        const spotsState = {};
        if (Array.isArray(action.spots.Spots)){
            action.spots.Spots.forEach((spot) => {spotsState[spot.id] = spot;})
    }else {
        console.error(action.payload);
    }
        return spotsState;
      }

  default:
    return state;
  }
};
export default spotsReducer
