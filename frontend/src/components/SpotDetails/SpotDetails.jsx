import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getOneSpot } from "../../store/spots";


const SpotDetails=()=>{
  const {spotId}=useParams();
  const spots = useSelector(state=>state.spotsState)
  let currSpot = spots[spotId]
  console.log('====>current spot',currSpot)
  console.log('==>spot img', currSpot.SpotImages)
  console.log('==>spot img', currSpot.SpotImages[0])


  // const currUser = useSelector((state) => state.session.user)

  const dispatch = useDispatch()

    // useEffect(()=>{
  //   console.log('in useEffect calling getOneSpot')
  //   dispatch(getOneSpot(spotId))

  // },[dispatch,spotId])

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getOneSpot(spotId)).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch, spotId]);

  return (
    <div className="page-container">
    {isLoaded ? (
      <div>
        <div className="spot-details">
          <h1 className="title">{currSpot.name}</h1>
          <h3 className="location">{currSpot.city}, {currSpot.state}, {currSpot.country}</h3>
        </div>
        <div className="image-container">
            <img className="main-image" src={currSpot.SpotImages[0]?.url} alt="Spot View" />
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    )}
  </div>

    // <div className="page-container">
    //   <div className="spot-details">
    //     <h1 className="title">{currSpot.name}</h1>
    //     <h3 className="location">{currSpot.city}, {currSpot.state}, {currSpot.country}</h3>
    //   </div>

    //   <div className="image-container" >
    //    <img className="main-image" src={currSpot.SpotImages[0]?.url} alt="SpotView" />


    //   </div>

    // </div>
  )

}


export default SpotDetails


// return (
//   <div className='page-container'>
//     <div className='details-container'>
//     <h1 className='title-header'>{currentSpot.name}</h1>
//     <h3 className='location-details'>{currentSpot.city}, {currentSpot.state}, {currentSpot.country}</h3>
//   </div>

//     <div className='image-gallery'>
//       {/* Primary image */}
//       <img className='primary-image' src={currentSpot.SpotImages[0]?.url} alt='Spot view' />
//       {/* Secondary images */}
//       <div className='secondary-images'>
//         {currentSpot.SpotImages.slice(1).map((image) => (
//           <img key={image.id} className='additional-image' src={image.url} alt='Spot' />
//         ))}
//       </div>
//     </div>
//     <div className='details-container'>
//       <div className='info-section'>
//         <div className='hosting-details'>
//           <p>Managed by {currentSpot.Owner.firstName} {currentSpot.Owner.lastName}</p>
//           <p className='description-text'>{currentSpot.description}</p>
//         </div>
//         <div className='reservation-info'>
//           <div className='pricing-and-rating'>
//             <span className='nightly-rate'>${currentSpot.price}/night</span>
//             <div className='star-rating-container'>
//               <p>★ {currentSpot.avgStarRating > 0 ? currentSpot.avgStarRating.toFixed(1) : 'New'}&nbsp;
//           {/* ·{currentSpot.numReviews} {currentSpot.numReviews === 1 ? 'Review' : 'Reviews'}</p> */}
//           {currentSpot.numReviews > 0 ? ` · ${currentSpot.numReviews} ${currentSpot.numReviews === 1 ? 'Review' : 'Reviews'}` : ''}</p>

//             </div>
//           </div>
//           <button className='reserve-btn' onClick={reserveBtn}>Reserve</button>
//         </div>
//       </div>
//     </div>
//     <div className='reviews-container'>
//       <div className='ReviewTitle-container'>
//         {/* <h2>Reviews</h2> */}
//         <p>★ {currentSpot.avgStarRating > 0 ? currentSpot.avgStarRating.toFixed(1) : 'New'}&nbsp;
//           {/* · {currentSpot.numReviews} {currentSpot.numReviews === 1 ? 'Review' : 'Reviews'}</p> */}
//           {currentSpot.numReviews > 0 ? ` · ${currentSpot.numReviews} ${currentSpot.numReviews === 1 ? 'Review' : 'Reviews'}` : ''}</p>
//           {currentUser && !isOwner(currentSpot.Owner) && !hasReview &&
//         <div className='Post-review'>
//           <OpenModalButton
//             className='reserve-btn'
//             buttonText='Post Your Review'
//             modalComponent={<ReviewForm spotId={currentSpot.id} />} />
//         </div>
//       }
//       </div>
//       <div className='reviews-list'>
//         <SpotFeedbacks spotId={currentSpot.id} />
//       </div>
//     </div>
//   </div>
// );
