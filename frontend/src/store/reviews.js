import { csrfFetch } from './csrf';

const GET_REVIEWS = '/reviews/GET_REVIEWS';

const DELETE_REVIEWS = '/reviews/DELETE_REVIEWS';

const ADD_REVIEWS='/reviews/ADD_REVIEWS';


export const getReviews = (reviews)=>({
  type: GET_REVIEWS,
  reviews
})

export const delReview=(reviewId)=>({
  type:DELETE_REVIEWS,
  reviewId
})

export const addReview =(review)=>({
  type: ADD_REVIEWS,
  review
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

export const delReviewThunk=(reviewId)=>async (dispatch)=>{
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })

  if(res.ok){
    dispatch(delReview(reviewId))
  }else{
    const error = await res.json();
    console.log(error);
    return error
  }
}

export const addReviewThunk=(spotId, review)=>async (dispatch)=>{
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  })

  if(res.ok){
    const newReview = await res.json()
    dispatch(addReview(newReview))
    return newReview
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
      action.reviews.Reviews.forEach((review) => {newState[review.id] = review})
      return newState
    }
    case DELETE_REVIEWS:{
      const newState={...state}
      delete newState[action.reviewId]
      return newState
    }
    case ADD_REVIEWS:{
      return {...state, [action.review.id]:action.review}

    }

    default:
      return state;
  }
}

export default reviewReducer;
