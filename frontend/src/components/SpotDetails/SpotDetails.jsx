import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getOneSpot } from "../../store/spots";
import './SpotDetails.css'
import { getReviewsThunk } from "../../store/reviews";
import OpenModalButton from '../OpenModalButton'
import ReviewForm from "../ReviewForm/ReviewForm";
import SpotReview from "./SpotReview";

const SpotDetails=()=>{
  const {spotId}=useParams();
  const spots = useSelector(state=>state.spotsState)
  let currSpot = spots[spotId]
  // console.log('====>current spot',currSpot)
  // console.log('==>spot img', currSpot.SpotImages)

  const currUser = useSelector((state) => state.session.user)


  function isOwner(spotOwner) {
    if (currUser && spotOwner) {
      return currUser.id == spotOwner.id
    }
    else
    {
      return null
    }
}


  const reviews = useSelector(state => state.reviewState)
  const reviewArray = Object.values(reviews)

  console.log("reviews====>",reviews)

  const dispatch = useDispatch()

    useEffect(()=>{
    dispatch(getOneSpot(spotId))
    dispatch(getReviewsThunk(spotId))

  },[dispatch,spotId,reviewArray.length])

  if (!currSpot || !currSpot.Owner) {
    return (<div>Loading...</div>);
  }


  const hasReview = reviewArray.some(review =>
    review.userId === currUser?.id);

  const reserveBtn = (e) => {
    e.preventDefault();
    alert("Feature coming soon");
};


  return (
    <div className="page-container">
    {currSpot ? (
      <div>
        <div className="spot-details">
          <h1 className="title">{currSpot.name}</h1>
          <h3 className="location">{currSpot.city}, {currSpot.state}, {currSpot.country}</h3>
        </div>
        <div className="image-container">
            <img className="main-image" src={currSpot.SpotImages[0]?.url} alt="MainView" />
            <div className="other-images">
   {currSpot.SpotImages.slice(1).map((image) => (<img key={image.id} className="detail-images"  src={image.url} alt='Spot' />))}
            </div>
        </div>

  <div className='details-container'>
    <div className='info-section'>
      { <div className='host'>
        <p>Hosted by {currSpot.Owner.firstName} {currSpot.Owner.lastName}</p>
        <p className='description'>{currSpot.description}</p>
      </div> }
      <div className='reservation'>
        <div className='pricing-and-rating'>
          <span className='price-detail'>${currSpot.price}/night</span>
          <div className='rating-detail'>
            <p>★ {currSpot.avgStarRating > 0 ? currSpot.avgStarRating.toFixed(1) : 'New'}&nbsp;
        {currSpot.numReviews > 0 ? ` · ${currSpot.numReviews} ${currSpot.numReviews === 1 ? 'Review' : 'Reviews'}` : ''}</p>
          </div>
        </div>
        <button className='reserve-btn' onClick={reserveBtn}>Reserve</button>
      </div>
    </div>
  </div>

  <div className='reviews-container'>
    <div className='review-head'>
      <p>★ {currSpot.avgStarRating > 0 ? currSpot.avgStarRating.toFixed(1) : 'New'}&nbsp;
        {currSpot.numReviews > 0 ? ` · ${currSpot.numReviews} ${currSpot.numReviews === 1 ? 'Review' : 'Reviews'}` : ''}</p>
        {currUser && !isOwner(currSpot.Owner) && !hasReview &&
      <div className='Post-review'>
        <OpenModalButton
          className='reserve-btn'
          buttonText='Post Your Review'
          modalComponent={<ReviewForm spotId={currSpot.id} />} />
      </div>
    }
    </div>
    <div className='reviews-list'>
      <SpotReview spotId={currSpot.id} />

    </div>
  </div>
      </div>
    ) : (
      <div>Loading...</div>
    )}
  </div>



  )

}

export default SpotDetails
