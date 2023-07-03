import React from 'react';
import "./Navbar.css"
import { useState } from 'react';
import {NavLink, useLocation} from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div>
      <nav>
        <a>
          {}
          <svg id="logo-11" width="100" height="50" viewBox="0 0 119 30" fill="none" xmlns=""></svg>
        </a>
        <div>
          <ul id="navbar">
            <li>
              <NavLink
                to="/Homepage"
                className={activeLink === '/Homepage' ? 'active' : ''}
                onClick={() => handleLinkClick('/Homepage')}
                title="Homepage"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Course"
                className={activeLink === '/Course' ? 'active' : ''}
                onClick={() => handleLinkClick('/Course')}
                title="meine Aufgaben"
              >
                My Course
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Search"
                className={activeLink === '/Search' ? 'active' : ''}
                onClick={() => handleLinkClick('/Search')}
                title="Aufgabe suchen"
              >
                Join course
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Like"
                className={activeLink === '/Like' ? 'active' : ''}
                onClick={() => handleLinkClick('/Like')}
                title="gespeicherte Aufgaben"
              >
                My like
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Myprofile"
                className={activeLink === '/Myprofile' ? 'active' : ''}
                onClick={() => handleLinkClick('/Myprofile')}
                title="mein Konto"
              >
                My Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar
