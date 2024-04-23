import { csrfFetch } from './csrf';

const GET_REVIEWS = '/reviews/GET_REVIEWS'

export const getReviews = (reviews)=>({
  type: GET_REVIEWS,
  GET_REVIEWS
})


// export
