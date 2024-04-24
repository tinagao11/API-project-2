import { csrfFetch } from './csrf';

const GET_REVIEWS = '/reviews/GET_REVIEWS'

export const getReviews = (reviews)=>({
  type: GET_REVIEWS,
  reviews
})


export const getReviewsThunk=(spotId)=>async (dispatch)=>{
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if(res.ok){
    const reviewsData = await res.json()
    // console.log('reviewthunk',reviewsData)
    dispatch(getReviews(reviewsData))

  }else{
    const error = await res.json();
    console.log(error);
    return error
    }
}

function reviewReducer(state={},action){
  switch(action.type){
    case GET_REVIEWS:{
      const newState={}
      action.reviews.Reviews.forEach((review) => (newState[review.id] = review))
      return newState
    }

    default:
      return state;
  }
}

export default reviewReducer;
