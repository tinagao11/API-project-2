import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { delReviewThunk } from "../../store/reviews";
import './DeleteReview.css'


const DeleteReview =({reviewId})=>{
  const dispatch = useDispatch();

  const { closeModal } = useModal()

  const handleDelete=(e)=>{
    e.preventDefault();
    dispatch(delReviewThunk(reviewId))
    closeModal()
  }

  return(
    <>
<div className='delete-container'>

  <div className='del-text-container'>
    <h1 className='del-title'>Confirm Deletion</h1>
    <p className='del-text'>Are you sure you want to delete this review?</p>
  </div>

  <div className='del-btn-container'>
    <button className='confirm-btn' onClick={handleDelete}>Yes, Delete Review</button>
    <button className='cancel-btn' onClick={closeModal}>No, Keep Review</button>
  </div>

</div>
    </>
  )

}


export default DeleteReview;
