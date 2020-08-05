import React, { useEffect } from 'react';
import { CTX } from 'store';
import {Facebook, Instagram, Twitter, PhoneCall, Mail} from 'react-feather'
import Header from 'components/Header/Header';

const Contact = (props) => {

    document.title = `Talisman Leather - Contact Us`;

    const [appState, dispatch] = React.useContext(CTX);
    useEffect( () => {  dispatch({type: 'UPDATE_ACTIVE_SCREEN', payload: 'Contact'}) }, [appState.activeScreen]);

    return (
      <>
      <Header props={props} />
      <div className="container p-0 mb-5">
      <h2 className="mb-3">Contact</h2>

      <div className="row">
        <div className="col-sm-4 my-3"><p className="gold"><PhoneCall className="mr-1" /> 504-517-4433</p></div>
        <div className="col-sm-4 my-3"><p className="gold"><Mail className="mr-1" /> <a href="mailto:info@talismanleather.io">info@talisnmanleather.io</a></p></div>
        
      <ul class="nav nav-pills nav-fill w-100">
        <li class="nav-item border border-dark rounded mx-3">
          <a class="nav-link border-dark gold" href="https://www.facebook.com/raggedi/" target="_blank"><Facebook size={18} className="mr-1" /> Talisman on Facebook</a>
        </li>
        <li class="nav-item border border-dark rounded mx-3">
          <a class="nav-link border-dark gold" href="https://www.instagram.com/talismanleather" target="_blank"><Instagram size={18} className="mr-1" /> Talisman on Instagram</a>
        </li>
        <li class="nav-item border border-dark rounded mx-3">
          <a class="nav-link border-dark gold" href="https://twitter.com/talismannola" target="_blank"><Twitter size={18} className="mr-1" /> Talisman on Twitter</a>
        </li>
      </ul>
      </div>
        
      </div>
      </>
    );

}

export default Contact;
