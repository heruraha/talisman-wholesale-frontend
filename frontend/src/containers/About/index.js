import React, { useEffect } from 'react';
import { CTX } from 'store';
import Header from 'components/Header/Header';

const About = (props) => {

    document.title = `React Boiler`;

    const [appState, dispatch] = React.useContext(CTX);
    useEffect( () => {  dispatch({type: 'UPDATE_ACTIVE_SCREEN', payload: 'about'}) }, [appState.activeScreen]);

    return (
      <>
      <Header props={props} />
      <div className="container text-center">
        <h1 className="mt-5">About</h1>
      </div>
      </>
    );

}

export default About;
