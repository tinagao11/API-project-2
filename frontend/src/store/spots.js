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
        console.log('get all spots:', spotsData);
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
        action.spots.Spots.forEach((spot) => {
            spotsState[spot.id] = spot;
        });
        console.log('state:', spotsState);
        return spotsState;
      }

  default:
    return state;
  }
};
export default spotsReducer
