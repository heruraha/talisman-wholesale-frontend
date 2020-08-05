import React from 'react';
import { CTX } from 'store';
import './Header.scss';
import Logo from 'assets/img/logo.svg'
import { Link } from "react-router-dom";

const Header = (p) => {
  const [appState, dispatch] = React.useContext(CTX);

  const handleClick = () =>   {
    dispatch({type: 'TOGGLE_SIDENAV', payload: !appState.navOpen});
  }

  const gotoHome = () => {
    p.props.history.push('/')
    dispatch({type: 'TOGGLE_SIDENAV', payload: false});
  }
  return (
    <nav className={appState.activeScreen === 'work' ? `top-nav no-fix` : `top-nav z-index-3`}>
        <div className="container">
          <button className="home-toggler"  onClick={gotoHome}>
            <img src={Logo} className="logo-header" alt="" />
          </button>
          <div className="d-flex nav-container">
            <h3 className="smoll ml-3" onClick={gotoHome}>Talisman Leather</h3>
            <div className="nav-links">
            <Link to="/">Products</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/policies">Policies</Link>
            <Link to="/contact">Contact</Link>
            </div>
          </div>
          
          <button className="menu-toggler" type="button" onClick={handleClick}>
            {appState.cart.items && appState.cart.items.length > 0 ? <span className="count">{appState.cart.items.length}</span> : null}
            <svg  width="29" height="26" viewBox="0 0 29 26">
              <path d="M28.165-25.848H6.259v-2.364C6.151-28.789,5.276-29,4.694-29H.782A.955.955,0,0,0,0-28.212H0a.955.955,0,0,0,.782.788H4.694L7.824-8.515a3.679,3.679,0,0,0-.782,2.364A3.074,3.074,0,0,0,10.171-3c1.782,0,3.912-1.357,3.912-3.152h0c0-.48-.543-1.161-.782-1.576h7.041c-.239.415,0,1.1,0,1.576h0A3.074,3.074,0,0,0,23.471-3,3.074,3.074,0,0,0,26.6-6.152a3.19,3.19,0,0,0-.782-2.364c-.131-.52-.988-.788-1.565-.788H9.388l-.782-3.152H25.818c.573,0,.665-.223.782-.788l2.347-11.03C29.1-25.03,28.932-25.848,28.165-25.848ZM11.735-6.152a1.539,1.539,0,0,1-1.565,1.576A1.539,1.539,0,0,1,8.606-6.152a1.539,1.539,0,0,1,1.565-1.576A1.539,1.539,0,0,1,11.735-6.152ZM23.471-4.576a1.539,1.539,0,0,1-1.565-1.576,1.539,1.539,0,0,1,1.565-1.576,1.539,1.539,0,0,1,1.565,1.576A1.539,1.539,0,0,1,23.471-4.576Zm1.565-9.455H8.606L7.041-24.273H27.382Z" transform="translate(0 29)" fill="#fff"/>
            </svg>
          </button>
        </div>
    </nav>
  )
}

export default Header;
