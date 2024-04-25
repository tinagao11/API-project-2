import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from '../../store/spots';
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import './ManageSpot.css'

const ManageSpot=()=>{

  const dispatch = useDispatch()
  const naviagte = useNavigate()

  // const [spotsPosted, setSpotsPosted] = useState(false)

  const currUser = useSelector((state)=>state.session.user)
  // console.log(currUser.id)
  const spotsObj = useSelector(state=>state.spotsState)
  // console.log('====>spotsobj',spotsObj)
  const spots = Object.values(spotsObj);
  // console.log('====>spots',spots)

  const currSpots = spots.filter(spot=>spot.ownerId == currUser.id)
  console.log(currSpots)

  let toCreate = ()=>{naviagte('/spots/new')}


  useEffect(()=>{
    dispatch(getAllSpots())
  },[dispatch])


return (
  <>
  <h1 className="manageSpot-title">Manage Your Spots</h1>
  <div className="create-btn">
 <Link to='/spots/new' className="create-link" onClick={toCreate}>Create a New Spot</Link>
 </div>
  <div className="spots-container">
    {currSpots.map((spot)=>(
      <div className="each-spot" key={spot.id}>
        <NavLink to={`/spots/${spot.id}`}>
          <div className="spot-container" title={spot.name}>
            <img className='image' src={spot.previewImage} alt={spot.name} />
            <div className='rating-location'>
              <div className="location">{spot.city}, {spot.state}</div>
              <div className="rating">★ {spot.avgRating > 0 ? spot.avgRating.toFixed(1) : 'New'}</div>
            </div>
          <div className="price">${spot.price} night</div>
          </div>
        </NavLink>

        <div className='update-delete-btn'>
          <NavLink className='Update-btn' to={`/spots/${spot.id}/edit`}>Update</NavLink>
          <button>delete temp</button>
        </div>
      </div>
    ))}
  </div>
  </>
)

}


export default ManageSpot;
