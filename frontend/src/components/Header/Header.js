import React from 'react';
import { CTX } from 'store';
import './Header.scss';
import Logo from 'assets/img/logo.svg'

const Header = (p) => {
  const [appState, dispatch] = React.useContext(CTX);

  const handleClick = () =>   {
    dispatch({type: 'TOGGLE_SIDENAV', payload: !appState.navOpen});
  }

  const gotoHome = () => {
    p.props.history.push('/')
  }
  return (
    <nav className={appState.activeScreen === 'work' ? `top-nav no-fix` : `top-nav z-index-3`}>
        <div className="container">
          <button className="home-toggler"  onClick={gotoHome}>
            <img src={Logo} className="logo-header" alt="" />
          </button>
          <button className="menu-toggler" type="button" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="23" viewBox="0 0 29 23">
              <path d="M14.051-21.527a.387.387,0,0,0,.387-.387v-1.547a.387.387,0,0,0-.387-.387h-28.1a.387.387,0,0,0-.387.387v1.547a.387.387,0,0,0,.387.387Zm0,10.312a.387.387,0,0,0,.387-.387v-1.547a.387.387,0,0,0-.387-.387h-28.1a.387.387,0,0,0-.387.387V-11.6a.387.387,0,0,0,.387.387Zm0,10.312a.387.387,0,0,0,.387-.387V-2.836a.387.387,0,0,0-.387-.387h-28.1a.387.387,0,0,0-.387.387v1.547a.387.387,0,0,0,.387.387Z" transform="translate(14.438 23.848)" fill="#fff"/>
            </svg>
          </button>
        </div>
    </nav>
  )
}

export default Header;
