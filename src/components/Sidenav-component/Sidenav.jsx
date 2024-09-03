import React from 'react';
import { Link } from 'react-router-dom';
import './Sidenav.css';
import { ReactComponent as Logo } from '../../assets/Logo1.svg';

const Sidenav = ({menu}) => {

  return (
    <nav className='side-nav'>
      <div className='logo'>
        <Logo width="70%" height="5%" />
      </div>
      <ul>
        {menu.map((item, index) => (
            <li key={index}>
                <Link to={item.path} activeClassName="active">
                    {item.name}
                </Link>
            </li>
        ))}
      </ul>
    </nav>
  )
};

export default Sidenav;
