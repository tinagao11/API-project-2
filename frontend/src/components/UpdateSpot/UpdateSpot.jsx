import { useDispatch, useSelector} from "react-redux"
import { useParams } from "react-router-dom";
import {spotUpdateThunk, getOneSpot} from '../../store/spots';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './UpdateSpot.css'

const UpdateSpot=()=>{
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate()

  const [validations, setValidations] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const spots = useSelector(state=>state.spotsState)
  let currSpot = spots[spotId]

  const [country, setCountry]= useState(currSpot?.country || '')
  const [address, setAddress] = useState(currSpot?.address || '');
  const [city, setCity] = useState(currSpot?.city || '');
  const [state, setState] = useState(currSpot?.state || '');
  const [lat, setLat] = useState(currSpot?.lat || '');
  const [lng, setLng] = useState(currSpot?.lng || '');
  const [description, setDescription] = useState(currSpot?.description || '');
  const [name, setName] = useState(currSpot?.name || '');
  const [price, setPrice] = useState(currSpot?.price || '');

  useEffect(()=>{
    let val={};
    if(!spotId){
      dispatch(getOneSpot(spotId))
    }

    if(!name){val.name='Name is required'}
    if(!country){val.country='Country is required'}
    if(!address){val.address='Address is required'}
    if(!city){val.city='City is required'}
    if(!state){val.state='State is required'}
    if(description && description.length<30){val.description='Description needs a minimum of 30 characters'}
    if(!price){val.price='Price is required'}

    setValidations(val)

  }, [dispatch, spotId,name, country, address, city, state, description, price])

  const handleUpdate =(e)=>{
    const {name, value}= e.target;
    switch(name){
      case 'country': setCountry(value);break;
      case 'address': setAddress(value);break;
      case 'city': setCity(value);break;
      case 'state': setState(value);break;
      case 'lat': setLat(value);break;
      case 'lng': setLng(value);break;
      case 'description': setDescription(value);break;
      case 'name': setName(value);break;
      case 'price': setPrice(value); break;
      default: break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const val = {}
    if (Object.keys(val).length === 0) {
        try {
            await dispatch(spotUpdateThunk({
                country,
                address,
                city,
                state,
                lat,
                lng,
                description,
                name,
                price
            }, spotId));
            nav(`/spots/${spotId}`);
        } catch (error) {
          const errorData = await error.json()
          if (errorData && errorData.errors) {
              setValidations(errorData.errors)
            }else{
              console.error(error);
            }
        }
    } else {
        setValidations(val);
    }
};

return (
  currSpot && (
    <>
    <div className="update-spot-container">
      <form className='update-form' onSubmit={handleSubmit}>
        <h1 className="update-title">Update Your Spot</h1>
        <h2>Where&apos;s your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>

            <div className="field">
            <label>Country</label>
            <input
              type='text'
              className='form-input'
              name='country'
              value={country}
              onChange={handleUpdate}
              placeholder='Country'/>
              {submitted && validations.country && <p className='form-error'>{validations.country}</p>}
            </div>

            <div className="field">
            <label>Street Address</label>
            <input
              type='text'
              className='form-input'
              name='address'
              value={address}
              onChange={handleUpdate}
              placeholder='Address'/>
              {submitted && validations.address && <p className='form-error'>{validations.address}</p>}
            </div>

            <div className="field">
            <label>City</label>
            <input
              type='text'
              className='form-input'
              name='city'
              value={city}
              onChange={handleUpdate}
              placeholder='city'/>
              {submitted && validations.city && <p className='form-error'>{validations.city}</p>}
            </div>

            <div className="field">
            <label>State</label>
            <input
              type='text'
              className='form-input'
              name='state'
              value={state}
              onChange={handleUpdate}
              placeholder='state'/>
              {submitted && validations.state && <p className='form-error'>{validations.state}</p>}
            </div>

            <div className="field">
            <label>Lat</label>
            <input
              type='text'
              className='form-input'
              name='lat'
              value={lat}
              onChange={handleUpdate}
              placeholder='Latitude'/>
              {submitted && validations.lat && <p className='form-error'>{validations.lat}</p>}
            </div>

            <div className="field">
            <label>Lng</label>
            <input
              type='text'
              className='form-input'
              name='lng'
              value={lng}
              onChange={handleUpdate}
              placeholder='Longitude'/>
              {submitted && validations.lng && <p className='form-error'>{validations.lng}</p>}
            </div>

            <hr></hr>
            <h2>Describe your place to guests</h2>
            <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
            <div className="field">
            <label>Description</label>
            <textarea
            className='form-textarea'
            name='description'
            value={description}
            onChange={handleUpdate}
            placeholder='Describe your spot'
            />
              {submitted && validations.description && <p className='form-error'>{validations.description}</p>}
            </div>

            <hr></hr>
            <h2>Create a title for your spot</h2>
            <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
            <div className="field">
            <label>Name</label>
            <input
              type='text'
              className='form-input'
              name='name'
              value={name}
              onChange={handleUpdate}
              placeholder='name'/>
              {submitted && validations.name && <p className='form-error'>{validations.name}</p>}
            </div>

            <hr></hr>
            <h2>Set a base price for your spot</h2>
              <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
              <div className="field">
            <label>Price</label>
            <input
              type='number'
              className='form-input'
              name='price'
              value={price}
              onChange={handleUpdate}
              placeholder='price'/>
              {submitted && validations.price && <p className='form-error'>{validations.price}</p>}
            </div>

            <button type='submit' className='submit-btn'>Update Spot</button>

      </form>
    </div>
    </>
  )

);

}




export default UpdateSpot;
