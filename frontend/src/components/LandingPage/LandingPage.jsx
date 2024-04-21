import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from '../../store/spots'

function LandingPage(){

  const dispatch = useDispatch()

  const spotsObj = useSelector(state=>state.spots)
  console.log('====>',spotsObj)

  const spots = Object.values(spotsObj);

  useEffect(()=>{
    dispatch(getAllSpots())
  },[dispatch])

  return(
    <>
    <h1>homepage</h1>
    </>
  )



}


export default LandingPage;
