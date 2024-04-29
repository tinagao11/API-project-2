import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation-bonus.css';
import { GiTreehouse } from "react-icons/gi";

function Navigation({ isLoaded }) {
  const currUser = useSelector(state => state.session.user);

  return (
    <div className='head-container'>
      <div className='logo-title'>
        <NavLink className='logo' to="/">
        <GiTreehouse size={60} color='FF385C' />
        </NavLink>
        <h1 className='title'>airbnb</h1>
        </div>

        <nav className='create-profile'>
        {currUser && (
          // <div className='create-spot-container'>
          <NavLink to='/spots/new' className='create-spot' >
            <span>Create a New Spot</span>
          </NavLink>
          // </div>
        )}
        <div className='profile'>
          {isLoaded && (
            <ProfileButton user={currUser} />
          )}
          </div>
        </nav>
    </div>
  );
}

export default Navigation;
