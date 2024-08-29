import React from 'react';
import { Link } from 'react-router-dom';
import './Sidenav.css';
import { ReactComponent as Logo } from '../../assets/Logo.svg';

const Sidenav = ({role}) => {
    const navItems = {
        patient: ['Dashboard', 'Appointments', 'Medical Records'],
        doctor: ['Dashboard', 'Patients', 'Schedule', 'Reports'],
        staff: ['Dashboard', 'Manage Patients', 'Manage Appointments'],
      };
    

  return (
    <nav className='side-nav'>
      <div className='logo'>
        <Logo width="70%" height="5%" />
      </div>
      <ul>
        {navItems[role]?.map((item, index) => (
            <li key={index}>
                <Link to={`/${role.toLowerCase()}/${item.toLowerCase().replace(' ', '-')}`}>
                    {item}
                </Link>
            </li>
        ))}
      </ul>
    </nav>
  )
};

export default Sidenav;
