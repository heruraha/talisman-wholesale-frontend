import React, { useEffect } from 'react';
import { CTX } from 'store';
import Header from 'components/Header/Header';
import ProductListing from 'components/ProductListing/ProductListing';
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

    const loadProduct = (product) => {
      console.log(product)
      dispatch({type: 'SET_ACTIVE_PRODUCT', payload: product})
      props.history.push('/product/'+product._id)
    }

    return (
      <>
      <Header props={props} />
      <div className="container text-center p-0 mb-5">
        <div className="products-wrap row">
        { appState.products ?
          appState.products.map((p,i) => {
            return <ProductListing key={i} name={p.name} price={p.price} click={() => loadProduct(p)} />
          })
          :
          <h1>no products</h1>
        }
        </div>

      </div>
      </>
    );

}

export default MainScreen;
