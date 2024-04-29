import { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsThunk } from '../../store/reviews';
import DeleteReview from '../DeleteReview/DeleteReview'
import OpenModalButton from '../OpenModalButton'
import './SpotReview.css';

const SpotReview = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const spot = useSelector((state) =>{return  state.spotsState});
  let currentSpot = spot[spotId]

  const reviewsState = useSelector(state => state.reviewState);

  const reviewArray = Object.values(reviewsState).filter((review) => review.spotId == parseInt(spotId)).reverse()

  const currUser = useSelector((state) => state.session.user)

  useEffect(() => {
    dispatch(getReviewsThunk(spotId));
  }, [dispatch, spotId]);



function isOwner(spotOwner) {
  if (currUser && spotOwner) {
    return currUser.id == spotOwner.id
  }
  else
  {
    return null
  }
}

const hasReview = reviewArray.some(review =>
review.userId === currUser?.id);
if (!reviewArray.length && currUser && !isOwner (currentSpot.Owner) && !hasReview ) {
    return <div className='No-review'>Be the first to post a review!</div>;
}


function formatDate(date) {
  const parsedDate = new Date(date);
  const options = {
    month: 'long',
    year: 'numeric'
  };
  const dateFormatter = new Intl.DateTimeFormat('default', options);
  return dateFormatter.format(parsedDate);
}


  return (
    <>
    <div className='Reviews-container'>
        {reviewArray.map(({ id, User, createdAt, review }) => (
            <div key={id}>
                <div className='Review-container'>
                    {User && <h2 className='Review-Name'>{User.firstName}</h2>}
                    <div className='Review-date'>
                        <p className='date-month'>{formatDate(createdAt)}</p>
                    </div>
                    <p className='Review-content'>{review}</p>
                    {currUser?.id === User?.id && (
                        <OpenModalButton
                            className='delbtn'
                            buttonText='Delete'
                            modalComponent={<DeleteReview reviewId={id} />}
                        />
                    )}
                </div>
                <hr className='Review-line' />
            </div>
        ))}
    </div>
</>

  )

};
export default SpotReview
