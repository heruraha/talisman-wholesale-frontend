import React, { useEffect, useState } from 'react';
import { CTX } from 'store';
import Header from 'components/Header/Header';
import ProductListing from 'components/ProductListing/ProductListing';
import APIService from 'services/api/apiService';
import Paginator from 'react-hooks-paginator';

const Categories = (props) => {

    document.title = `Search by Category - Talisman Leather Wholesale`;

  const [appState, dispatch] = React.useContext(CTX);


    useEffect( () => {
      dispatch({type: 'UPDATE_ACTIVE_SCREEN', payload: 'home'})
      dispatch({type: 'LOADING_ENABLED'})
      APIService.getAllProducts()
      .then((res) =>  { 
       //console.log(res, 'products')
        let arr = []
        res.forEach(e => {
          let tmp = e.acf
          tmp.ID = e.ID
          arr.push(tmp)
        })
        dispatch({type: 'GET_ALL_PRODUCTS', payload: arr })
        dispatch({type: 'LOADING_DISABLED'});
        return arr
      })
      //.then(res => setData(res))
      .catch((err) => { 
        dispatch({type: 'LOADING_DISABLED'});
        console.log(err);
      }) 

    }, [appState.activeScreen]);

    const loadProduct = (product) => {
      console.log('clicked', product)
      dispatch({type: 'SET_ACTIVE_PRODUCT', payload: product})
      props.history.push('/product/'+product.ID)
    }

    const categories = [
      {name: 'Harnesses', link: 'harnesses'},
      {name: 'Strap-ons', link: 'strapons'},
      {name: 'Sensation & Impact', link: 'impact'},
      {name: 'Accessories', link: 'accessories'},
      {name: 'Restraints', link: 'restraints'},
      {name: 'Collars', link: 'collars'},
  ]

    return (
      <>
      <Header props={props} />
      <div className="container text-center p-0 mb-5">
        <div className="products-wrap row">

          {
            categories.map((e,i) => (
                <div key={i} className="col-sm-6 col-md-4 pointer">
                  <div className="card bg-dark py-3 mb-3" onClick={()=>props.history.push(`/category/${e.link}`)}>
                    <h4>{e.name}</h4>
                  </div>
                </div>
            ))
          }

          <div className="alert text-center col-sm-12">
            <a href="/">View All Products</a>
          </div>

        </div>
      </div>
      </>
    );

}

export default Categories;
