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
