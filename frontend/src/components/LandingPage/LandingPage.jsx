import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from '../../store/spots'
import { NavLink } from "react-router-dom";
import './LandingPage.css'

function LandingPage(){

  const dispatch = useDispatch()

  const spotsObj = useSelector(state=>state.spotsState)
  // console.log('====>spotsobj',spotsObj)
  const spots = Object.values(spotsObj);
  // console.log('====>spots',spots)

  useEffect(()=>{
    dispatch(getAllSpots())
  },[dispatch])

  return(
    <div className="spots">
    {
      spots.map((spot)=>(
        <NavLink className='nav' to={`/spots/${spot.id}`} key={spot.id}>
          <div className="spot" title={spot.name}>
          <img className='image' src={spot.previewImage} alt={spot.name} />
          <div className='Review-location-container'>
            <div className="location">{spot.city}, {spot.state}</div>
            <div className="review">★ {spot.avgRating > 0 ? spot.avgRating.toFixed(1) : 'New'}</div>
             </div>
            <div className="price">${spot.price} per night</div>
          </div>
        </NavLink>
      ))
    }
    </div>

  )



}


export default LandingPage;
