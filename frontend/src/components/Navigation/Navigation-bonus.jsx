import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation-bonus.css';
import { GiTreehouse } from "react-icons/gi";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='head-container'>
        <NavLink className='logo' to="/">
        <GiTreehouse size={60} color='FF385C' />
        </NavLink>
        <h1 className='title'>airbnb</h1>

        {sessionUser && (
          <NavLink to='/spots/new' className='CreateSpotLink'>
            <span>Host</span>
            <span>Your</span>
            <span>Spot</span>
          </NavLink>
        )}
          {isLoaded && (
            <ProfileButton user={sessionUser} />
          )}
    </div>
  );
}

export default Navigation;
