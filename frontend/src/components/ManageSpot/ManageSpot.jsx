import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllSpots } from '../../store/spots';
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import './ManageSpot.css'
import OpenModalButton from "../OpenModalButton"
import DeleteSpot from "../DeleteSpot/DeleteSpot";


const ManageSpot=()=>{

  const dispatch = useDispatch()
  const nav = useNavigate()



  const currUser = useSelector((state)=>state.session.user)
  // console.log(currUser.id)
  const spotsObj = useSelector(state=>state.spotsState)
  // console.log('====>spotsobj',spotsObj)
  const spots = Object.values(spotsObj);
  console.log('====>spots',spots)

  const currSpots = spots.filter(spot=>spot.ownerId == currUser.id)
  // console.log(currSpots)
  const [spotPosted, setSpotPosted] = useState(false)

  const switchSpotState = () => {
    setSpotPosted(currentValue => !currentValue);
};

  useEffect(()=>{
    dispatch(getAllSpots())
  },[dispatch, spotPosted])

  let toCreate = ()=>{nav('/spots/new')}

return (
  <>
  <h1 className="manageSpot-title">Manage Spots</h1>
  {/* <div className="create-btn">
 <Link to='/spots/new' className="create-link" onClick={toCreate}>Create a New Spot</Link>
 </div> */}
 {currSpots.length === 0 && (
  <div className="create-btn">
  <Link to='/spots/new' className="create-link" onClick={toCreate}>No spots yet! Create a New One</Link>
  </div>
 )}
  <div className="spots-container">
    {currSpots.map((spot)=>(
      <div className="each-spot" key={spot.id}>
        <NavLink className='nav' to={`/spots/${spot.id}`}>
          <div className="spot-container" title={spot.name}>
            <img className='image' src={spot.previewImage} alt={spot.name} />
            <div className='rating-location'>
              <div className="location">{spot.city}, {spot.state}</div>
              <div className="rating">★ {spot.avgRating > 0 ? spot.avgRating.toFixed(1) : 'New'}</div>
            </div>
          <div className="price">${spot.price}/night</div>
          </div>
        </NavLink>

        <div className='update-delete-btn'>
          <NavLink className='update-btn' to={`/spots/${spot.id}/edit`}>Update</NavLink>
          <OpenModalButton
            buttonText='Delete'
            className='delete-btn'
            modalComponent={<DeleteSpot spot={spot} switchSpotState={switchSpotState} />}
          />
        </div>
      </div>
    ))}
  </div>
  </>
)

}


export default ManageSpot;


// {spots.length === 0 && (
//   <button className='Create-btn' onClick={navigateToCreate}>
//       Create a New Spot
//       </button>)}
