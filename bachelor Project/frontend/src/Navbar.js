import React from 'react';
import "./Navbar.css"
import { useState } from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import logoutIcon from "./icons/logout.png"

function Navbar({ isLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const handleLogout = () => {
    // 执行退出账号操作
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
     localStorage.removeItem('userType');
    setLoggedIn(false);
    navigate('/'); // 退出账号后跳转回登录页面或其他适当的页面
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
                title="Meine Startseite"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Course"
                className={activeLink === '/Course' ? 'active' : ''}
                onClick={() => handleLinkClick('/Course')}
                title="Mein Lernen"
              >
                Lernen
              </NavLink>
            </li>

              <li>
              <NavLink
                to="/Ranklist"
                className={activeLink === '/Ranklist' ? 'active' : ''}
                onClick={() => handleLinkClick('/Ranklist')}
                title="Rangliste"
              >
                Rangliste
              </NavLink>
            </li>

            {/*<li>*/}
            {/*  <NavLink*/}
            {/*    to="/Search"*/}
            {/*    className={activeLink === '/Search' ? 'active' : ''}*/}
            {/*    onClick={() => handleLinkClick('/Search')}*/}
            {/*    title="Aufgabe suchen"*/}
            {/*  >*/}
            {/*    Join course*/}
            {/*  </NavLink>*/}
            {/*</li>*/}
            <li>
              <NavLink
                to="/Myprofile"
                className={activeLink === '/Myprofile' ? 'active' : ''}
                onClick={() => handleLinkClick('/Myprofile')}
                title="mein Konto"
              >
                Mein Profil
              </NavLink>
            </li>

            <li>
              <span className="logout-link" onClick={handleLogout}>Logout
                <img src={logoutIcon} alt="Logout" />
              </span>
            </li>


          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar
