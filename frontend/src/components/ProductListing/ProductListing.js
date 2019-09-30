import React from 'react'
import { CTX } from 'store';
import './ProductListing.scss'
import argo from 'assets/img/img-argo.jpg';

const ProductListing = (props) => {

    const [appState, dispatch] = React.useContext(CTX);

    const handleClick = () =>   {
      dispatch({type: 'TOGGLE_SIDENAV', payload: !appState.navOpen});
    }
  
    const gotoProduct = () => props.history.push('/')

    return (
        <div className="product-item col-sm-4 mb-3" onClick={props.click}>
            <img src={argo} alt=""/>
            <h4>{props.name}</h4>
            <span className="price">
                ${props.price}
            </span>
            
        </div>
    )
}

export default ProductListing;