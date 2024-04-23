import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/GET_SPOTS';
const GET_SPOT_DETAILS = 'spots/GET_SPOT_DETAILS';

export const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

export const getSpotDetails=(spot)=>({
    type: GET_SPOT_DETAILS,
    spot
});


export const getAllSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
        const spotsData = await res.json();
        dispatch(getSpots(spotsData));
        // console.log("===>",spotsData)
        return spotsData
    }else{
    const error = await res.json();
    console.log(error);
    return error
    }
}

export const getOneSpot=(spotId)=> async (dispatch)=>{
    const res = await csrfFetch(`/api/spots/${spotId}`);
    // console.log('in useEffect calling thunk')


    if(res.ok){
        const spot = await res.json();

        // console.log('api spot', spot)

        dispatch(getSpotDetails(spot))
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
      case GET_SPOT_DETAILS:{ return {...state, [action.spot.id]:action.spot}}

  default:
    return state;
  }
};
export default spotsReducer
