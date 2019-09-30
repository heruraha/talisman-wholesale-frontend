import React, { useEffect } from 'react';
import { CTX } from 'store';
import Header from 'components/Header/Header';
import APIService from 'services/api/apiService';
import argo from 'assets/img/img-argo.jpg';

const ProductDetails = (props) => {

    document.title = `Talisman Leather Wholesale`;

    const [appState, dispatch] = React.useContext(CTX);
    const [colors, setColors] = React.useState(null)
    const [sizes, setSizes] = React.useState(null)
    const [product, setProduct] = React.useState({size: null, color: null, quantity: 0})

    useEffect( () => {  
      dispatch({type: 'UPDATE_ACTIVE_SCREEN', payload: 'productDetails'})
      if(!appState.activeProduct) {
        dispatch({type: 'LOADING_ENABLED'})
        APIService.getProduct(props.match.params.id)
        .then((res) =>  { 
          console.log(res, 'yo')
          dispatch({type: 'SET_ACTIVE_PRODUCT', payload: res[0] })
          dispatch({type: 'LOADING_DISABLED'});
        })
        .catch((err) => { 
          dispatch({type: 'LOADING_DISABLED'});
          console.log(err);
        }) 
      }
    }, [appState.activeProduct]);

    useEffect( () => {
      if(appState.activeProduct) {
        const colors = appState.activeProduct.colors.split(', ');        
        setColors(colors)
        setProduct({...product, color: colors[0]})
        if(appState.activeProduct.sizes !== null) {
          let sizes = []
          const tmp = appState.activeProduct.sizes.split(', ');
          tmp.forEach(e => {
            switch(e) {
              case 'sm':
                sizes.push('Small/Medium')
                break;
              case 'lxl':
                sizes.push('Large/Extra Large')
                break;
              case 'l':
                sizes.push('Large')
                break;
              case 's':
                sizes.push('Small')
              case 'm':
                sizes.push('Medium')
              default:
                sizes.push('')
            }
          })
          setSizes(sizes)
          setProduct({...product, size: sizes[0], color: colors[0]})
        }

      }
    }, [appState.activeProduct])

    const handleColor = () => {
      //setProduct({color: })
    }
    const addToCart = () => {
      console.log(product)
      if(product.quantity > 0) {
        const obj = {
          product,
          productDetails: appState.activeProduct
        }
        console.log(obj, 'modified obj')
        dispatch({type: 'ADD_PRODUCT_TO_CART', payload: obj });
        dispatch({type: 'TOGGLE_SIDENAV', payload: !appState.navOpen});
      }
    }

    return (
      <>
      <Header props={props} />
      <div className="container">
        <div className="products-details-wrap row">
        { appState.activeProduct ?
          <div className="col-sm-6 product-info">
            <h1>{appState.activeProduct.name}</h1>
            <p className="headline">
              {appState.activeProduct.description}
            </p>
            <h1>${appState.activeProduct.price}</h1>

            <div className="d-flex flex-row">
              
            { sizes ? 
            <div className="option-wrap my-4 mr-4">
              <label>Size</label>
              <div className="controls d-flex flex-row">
                
                <select className="form-control" value={product.size} onChange={(e) => setProduct({...product, size: e.target.value})}>
                    {sizes.map( (e, i) => <option key={i} value={e}>{e}</option>)}
                </select>

              </div>
            </div>
            : null }

            { colors ?
              <div className="option-wrap my-4 mr-4">
                <label>Color</label>
                <div className="controls d-flex flex-row">
                  
                  <select className="form-control" value={product.color} onChange={(e) => setProduct({...product, color: e.target.value})}>
                      {colors.map( (e, i) => <option key={i} value={e}>{e}</option>)}
                  </select>

                </div>
              </div>
              : null }

            <div className="option-wrap my-4">
              <label>quantity</label>
              <div className="controls d-flex flex-row">
                <button className="increment btn-transparent text-left">–</button>
                <input
                  value={product.quantity} 
                  onChange={(e) => setProduct({...product, quantity: e.target.value})}
                  type="number" 
                  className="form-control" 
                  placeholder="0" 
                  min="0" 
                  max="93" />
                <button className="increment btn-transparent text-right">+</button>
              </div>
            </div>
              </div>

            <button className="btn btn-outline-primary btn-block btn-cart mt-5" onClick={addToCart}>Add to Cart</button>
            
          </div>
          :
          <div className="col-sm-6 product-info">
            
          </div>
        }
          <div className="col-sm-6 product-image-wrap">
            <img src={argo} alt=""/>
          </div>
        </div>
      </div>
      </>
    );

}

export default ProductDetails;
