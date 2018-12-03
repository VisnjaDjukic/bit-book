import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <div className="nav-wrapper container">
        <a className="brand-logo">BITbook</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to="/">Feed</Link></li>
          <li><Link to="/people">People</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </div>
    </nav>
  )
}
export { Header }