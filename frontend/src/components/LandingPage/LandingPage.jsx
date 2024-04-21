import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from '../../store/spots'
import { NavLink } from "react-router-dom";


function LandingPage(){

  const dispatch = useDispatch()

  const spotsObj = useSelector(state=>state.spotsState)
  // console.log('====>spotsobj',spotsObj)
  const spots = Object.values(spotsObj);
  console.log('====>spots',spots)

  useEffect(()=>{
    dispatch(getAllSpots())
  },[dispatch])

  return(
    <div className="spots">
    {
      spots.map((spot)=>(
        <NavLink className='nav' to={`/spots/${spot.id}`} key={spot.id}>
          <div className="spot" title={spot.name}>



          </div>
        </NavLink>
      ))
    }
    </div>

  )



}


export default LandingPage;
