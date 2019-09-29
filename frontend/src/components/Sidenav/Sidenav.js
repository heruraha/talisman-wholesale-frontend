import React from 'react';
import { Link } from "react-router-dom";
import { CTX } from 'store';
import Logo from 'assets/img/logo.svg'

import './Sidenav.scss';

const SideNav = () => {
  const [appState, dispatch] = React.useContext(CTX)
  const handleClick = () =>   {
    dispatch({type: 'TOGGLE_SIDENAV', payload: !appState.navOpen});
  }

  return (
    <div className={'sidenav ' + (appState.navOpen ? 'show' : 'hide')}>
      <div className="wrap">
        <img src={Logo} alt="Talisman Leather Wholesale" className="logo-nav" />
        <ul>
          <li className="link" onClick={handleClick}>
            <Link to="/">Home</Link>
          </li>
          <li className="link" onClick={handleClick}>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>

      
      <button className="close-menu" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
          <path d="M2.22-12.375l6.61-6.61,1.363-1.363a.516.516,0,0,0,0-.729L8.735-22.536a.516.516,0,0,0-.729,0L.032-14.563l-7.973-7.974a.516.516,0,0,0-.729,0l-1.459,1.459a.516.516,0,0,0,0,.729l7.974,7.974L-10.129-4.4a.516.516,0,0,0,0,.729l1.459,1.459a.516.516,0,0,0,.729,0L.032-10.187l6.61,6.61L8.006-2.214a.516.516,0,0,0,.729,0l1.459-1.459a.516.516,0,0,0,0-.729Z" transform="translate(10.28 22.687)" fill="#fff"/>
        </svg>
      </button>


    </div>
  )
}

export default SideNav;
