import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";

import './Sidenav.css';
import { ReactComponent as Logo } from '../../assets/greenLogo.svg';

const Sidenav = ({menu}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');

    navigate('/login');
  }

  return (
    <nav className='side-nav'>
      <div className='logo'>
        <Logo width="70%" height="5%" />
      </div>
      <ul>
        {menu.map((item, index) => (
            <li key={index}>
                <Link to={item.path} className={location.pathname === item.path ? 'active-link' : ''} >
                    <span className="icon"> {React.cloneElement(item.icon, { size: 19, color: "#333", })}</span>
                    <span className="item-name">{item.name}</span>
                </Link>
            </li>
        ))}
        <li className='logout' onClick={handleLogout}>
          <Link>
            <span className="icon"> {React.cloneElement(<CiLogout />, { size: 19, color: "#333", })}</span>
            <span className="item-name">Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
};

export default Sidenav;
