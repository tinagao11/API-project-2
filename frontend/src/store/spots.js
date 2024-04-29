import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/GET_SPOTS';
const GET_SPOT_DETAILS = 'spots/GET_SPOT_DETAILS';
const CREATE_SPOT = '/spots/CREATE_SPOT';
const CREATE_SPOT_IMAGE = '/spots/CREATE_SPOT_IMAGE'
const UPDATE_SPOT = '/spots/UPDATE_SPOT'
const DELETE_SPOT = 'spot/deleteSpot'

export const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

export const getSpotDetails=(spot)=>({
    type: GET_SPOT_DETAILS,
    spot
});

export const createSpot=(spot)=>({
    type:CREATE_SPOT,
    spot
});

export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot,
 });

 export const createSpotImage = (spotId, imageUrl) => ({
     type: CREATE_SPOT_IMAGE,
     spotId,
     imageUrl,
   });

export const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}


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


export const createSpotThunk = (spot) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spot),
    });

    if (res.ok) {
      const newSpot = await res.json();
      dispatch(createSpot(newSpot));
      return newSpot;
    } else{
        const error = await res.json();
        console.log(error);
        return error
        }
  };

  export const createSpotImageThunk = (spotId, images) => async (dispatch) => {

    const imgArray = []
    for (let image of images) {
        const res = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: image, preview: true })
        })

        if (res.ok) {
            const spot = await res.json()
            dispatch(createSpotImage(spot))
            imgArray.push(image)
        } else {
            const error = await res.json();
            console.log(error);
            return error
        }
    }
}

export const spotUpdateThunk = (newSpot, spotId) => async (dispatch) => {

    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newSpot),
    });

    if(res.ok){
        const newSpot =await res.json()
        dispatch(updateSpot(newSpot))

        return newSpot
    } else {
        const error = await res.json();
        console.log(error);
        return error
    }
}

export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if(res.ok){
        await res.json();
        dispatch(deleteSpot(spotId))
    }else {
        const error = await res.json();
        console.log(error);
        return error
    }
}

const spotsReducer = (state = {}, action) => {
  switch (action.type) {
      case GET_SPOTS:{
        const newState = {};
    action.spots.Spots.forEach((spot) => {newState[spot.id] = spot})
    // console.log('spots reducer',newState)
    return newState
      }
    case GET_SPOT_DETAILS:{
        let newState = { [action.spot.id]: action.spot };
        // console.log('detail reducer', newState)
        return newState;
    }
      case CREATE_SPOT:{return { ...state, [action.spot.id]: action.spot }}

      case UPDATE_SPOT: {return { ...state, [action.spot.id]: action.spot }}

      case DELETE_SPOT:{
        const newState = {...state}
        delete newState[action.spotId]
        return newState
    }

  default:
    return state;
  }
};
export default spotsReducer
