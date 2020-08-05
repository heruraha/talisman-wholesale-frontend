import React, { useEffect, useState } from 'react';
import { CTX } from 'store';
import Header from 'components/Header/Header';
import ProductListing from 'components/ProductListing/ProductListing';
import APIService from 'services/api/apiService';
import Paginator from 'react-hooks-paginator';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-156063246-1');
ReactGA.pageview(window.location.pathname + window.location.search);
const MainScreen = (props) => {

    document.title = `Talisman Leather Wholesale`;

  const [appState, dispatch] = React.useContext(CTX);

  const pageLimit = 15;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

    useEffect( () => {
      
      dispatch({type: 'UPDATE_ACTIVE_SCREEN', payload: 'home'})
      if(!appState.products) {
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
      .then(res => setData(res))
      .catch((err) => { 
        dispatch({type: 'LOADING_DISABLED'});
        console.log(err);
      }) 
      } else {
        setData(appState.products)
      }

    }, [appState.activeScreen]);

    useEffect(() => {
      setCurrentData(data.slice(offset, offset + pageLimit));
    }, [offset, data]);

    const loadProduct = (product) => {
      //console.log('clicked', product)
      dispatch({type: 'SET_ACTIVE_PRODUCT', payload: product})
      props.history.push('/product/'+product.ID)
    }



    return (
      <>
      <Header props={props} />
      <div className="container text-center p-0 mb-5">
        <div className="products-wrap">
        { appState.products ?
        <>
          <div className="row">
          { currentData.map((p,i) => 
            <ProductListing 
              key={i} 
              name={p.name} 
              price={p.price}
              photos={p.img}
              product={p}
              onClick={() => loadProduct(p)} 
              />
          ) }
          </div>
          <div className="row justify-content-center">
          <Paginator
            totalRecords={data.length}
            pageLimit={pageLimit}
            pageNeighbours={2}
            setOffset={setOffset}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          </div>
        </>
          :
          <h4>Loading...</h4>
        }
        </div>

      </div>
      </>
    );

}

export default MainScreen;
