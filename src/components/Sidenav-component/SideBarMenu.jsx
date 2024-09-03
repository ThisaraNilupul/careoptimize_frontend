import React from 'react';
import { Link } from 'react-router-dom';

function SideBarMenu({ name, path}) {
  return (
    <li>
        <Link to={path} activeClassName="active">
             {name}
        </Link>
    </li>
  )
}

export default SideBarMenu
