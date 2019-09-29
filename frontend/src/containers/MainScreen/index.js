import React, { useEffect } from 'react';
import { CTX } from 'store';
import Header from 'components/Header/Header';
import APIService from 'services/api/apiService';

const MainScreen = (props) => {

    document.title = `Talisman Leather Wholesale`;

    const [appState, dispatch] = React.useContext(CTX);
    useEffect( () => {  
      dispatch({type: 'UPDATE_ACTIVE_SCREEN', payload: 'home'})
      dispatch({type: 'LOADING_ENABLED'})
      APIService.getAllProducts()
      .then((res) =>  { 
        dispatch({type: 'GET_ALL_PRODUCTS', payload: res })
        dispatch({type: 'LOADING_DISABLED'});
      })
      .catch((err) => { 
        dispatch({type: 'LOADING_DISABLED'});
        console.log(err);
      }) 

    }, [appState.activeScreen]);

    return (
      <>
      <Header props={props} />
      <div className="container text-center">
        
      </div>
      </>
    );

}

export default MainScreen;
