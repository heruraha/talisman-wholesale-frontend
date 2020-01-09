import React, { useEffect, useState } from 'react';
import { CTX } from 'store';
import Header from 'components/Header/Header';
import ProductListing from 'components/ProductListing/ProductListing';
import APIService from 'services/api/apiService';
import Paginator from 'react-hooks-paginator';

const Category = (props) => {

    document.title = `Browsing Category - Talisman Leather Wholesale`;

  const [appState, dispatch] = React.useContext(CTX);
  
  const cat = props.match.params.cat;
  const setCat = (cat) => {
    switch(cat) {
      case cat === 'harnesses' : return 'Harnesses'
      case cat === 'strapons' : return 'Strap-ons'
      case cat === 'impact' : return 'Sensation & Impact'
      case cat === 'accessories' : return 'Accessories'
      case cat === 'restraints' : return 'Restraints'
      case cat === 'collars' : return 'Collars'
      default:
        throw Error('no category selected')
    }
  }
  const [category, setCategory] = useState(null)
  const pageLimit = 15;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

    useEffect( () => {
      dispatch({type: 'UPDATE_ACTIVE_SCREEN', payload: 'home'})
      dispatch({type: 'LOADING_ENABLED'})

      if(cat) {
        cat === 'harnesses' && setCategory('Harnesses'); 
        cat === 'strapons' && setCategory('Strap-ons'); 
        cat === 'impact' && setCategory('Sensation & Impact'); 
        cat === 'accessories' && setCategory('Accessories'); 
        cat === 'restraints' && setCategory('Restraints'); 
        cat === 'collars' && setCategory('Collars'); 
      }

    }, [appState.activeScreen]);

    useEffect( () => {
      if(category !== null) {
        console.log('category changed', category)
        
        if(!appState.products) {
          APIService.getAllProducts()
          .then((res) =>  { 
            let arr = []

            res.forEach(e => {
              let tmp = e.acf
              tmp.ID = e.ID
              if(tmp.category[0] === category) {
                arr.push(tmp)
              }
            })
            dispatch({type: 'SET_CATEGORY_PRODUCTS', payload: arr })
            dispatch({type: 'LOADING_DISABLED'});
            return arr
          })
          .then(res => setData(res))
          .catch((err) => { 
            dispatch({type: 'LOADING_DISABLED'});
            console.log(err);
          }) 
        } else {
          let arr = []

          appState.products.forEach(e => {
            if(e.category[0] === category) {
              arr.push(e)
            }
          })
          dispatch({type: 'SET_CATEGORY_PRODUCTS', payload: arr })
          setData(arr)
        }

    }
    }, [category])

    useEffect(() => {
      setCurrentData(data.slice(offset, offset + pageLimit));
    }, [offset, data]);

    const loadProduct = (product) => {
      console.log('clicked', product)
      dispatch({type: 'SET_ACTIVE_PRODUCT', payload: product})
      props.history.push('/product/'+product.ID)
    }



    return (
      <>
      <Header props={props} />

      <div className="container text-center p-0 mb-5">
        { category !== null ? 
        <div className="products-wrap">
        
        <div className="text-left px-0 col-sm-12 mb-4"><h3>{category}</h3> </div>  

        { appState.categoryProducts ?
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
        :
        <h4>Please select a category</h4>
        }
      </div>
      </>
    );

}

export default Category;
