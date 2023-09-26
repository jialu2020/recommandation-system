import React, {useEffect} from 'react';
import "./Navbar.css"
import { useState } from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import logoutIcon from "./icons/logout.png"
import jwt_decode from 'jwt-decode';

function Navbar({ isLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [isAdmin, setIsAdmin] = useState(false);




 useEffect(() => {
    // 从 localStorage 获取令牌
    const token = localStorage.getItem('token');

    if (token) {
      // 解码令牌
      const decodedToken = jwt_decode(token);
      // 现在你可以访问解码后的令牌数据，例如 is_admin 标识
      const isAdmin = decodedToken.is_admin;

      // 在状态中保存 isAdmin
      setIsAdmin(isAdmin);
    }
  }, []);


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
    localStorage.removeItem('kategorie');
    localStorage.removeItem('is_admin');
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
                to="/Statistik"
                className={activeLink === '/Statistik' ? 'active' : ''}
                onClick={() => handleLinkClick('/Statistik')}
                title="Lernzeit"
              >
                Statistik
              </NavLink>
            </li>

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

            {isAdmin && ( // 只有管理员才显示以下链接
              <li>
                <NavLink
                  to="/AdminPage"
                  className={activeLink === '/AdminPage' ? 'active' : ''}
                  onClick={() => handleLinkClick('/AdminPage')}
                  title="Admin Page"
                >
                 Administrator
                </NavLink>
              </li>
            )}


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
