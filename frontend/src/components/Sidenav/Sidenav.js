import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { CTX } from 'store';

import './Sidenav.scss';

const SideNav = () => {
  const [appState, dispatch] = React.useContext(CTX)
  const [checkout, goToCheckout] = React.useState(false)
  const handleClick = () =>   {
    dispatch({type: 'TOGGLE_SIDENAV', payload: !appState.navOpen});
  }
  const getTotal = () => {
    if(appState.cart.items && appState.cart.items.length > 0) {
        let total = [];
        appState.cart.items.map(e => total.push(Number(e.product.quantity) * Number(e.product.price)))
        return '$' + total.reduce((a,b) => a+b)
    } else {
      return '$0'
    }
  }
  const removeFromCart = (i)  => dispatch({type: 'REMOVE_PRODUCT_FROM_CART', payload: i})

  useEffect( () => goToCheckout(false), [checkout])

  return (
    <>
    { checkout ? <Redirect to="/checkout" /> : null}
    <div className={'sidenav ' + (appState.navOpen ? 'show' : 'hide')}>
      <div className="wrap">
        <h3 className="mt-4 mb-5">Your Cart</h3>
        {appState.cart.items && appState.cart.items.length > 0 ?
          <>
          <div className="cart-items full-width px-4">

            <ol className="list">
            <li>
              <div className="top header">
                <span className="first">Product</span>
                <span className="second">QTY.</span>
                <span className="third">Price</span>
              </div>
            </li>
            {appState.cart.items.map( (e,i) => {
              return (
                <li key={i}>
                  <div className="top">
                    <span className="first">{e.productDetails.name}</span>
                    <span className="second">{e.product.quantity}</span>
                    <span className="third">${e.product.price}</span>
                  </div>
                  <div className="bottom">{e.product.color} {e.product.color_alt &&  `+ ${e.product.color_alt} `} {e.product.size &&  `- ${e.product.size}`}</div>
                  <div className="delete" onClick={() => removeFromCart(i)}>
                    <svg width="19.25" height="22" viewBox="0 0 19.25 22">
                      <path d="M12.719-.687h.687a.344.344,0,0,0,.344-.344V-12.719a.344.344,0,0,0-.344-.344h-.687a.344.344,0,0,0-.344.344V-1.031A.344.344,0,0,0,12.719-.687Zm-6.875,0h.687a.344.344,0,0,0,.344-.344V-12.719a.344.344,0,0,0-.344-.344H5.844a.344.344,0,0,0-.344.344V-1.031A.344.344,0,0,0,5.844-.687ZM18.906-16.5H14.437l-1.444-1.925a2.323,2.323,0,0,0-1.65-.825H7.906a2.323,2.323,0,0,0-1.65.825L4.812-16.5H.344A.344.344,0,0,0,0-16.156v.687a.344.344,0,0,0,.344.344H1.375V.687A2.063,2.063,0,0,0,3.437,2.75H15.812A2.063,2.063,0,0,0,17.875.687V-15.125h1.031a.344.344,0,0,0,.344-.344v-.687A.344.344,0,0,0,18.906-16.5ZM7.356-17.6a.78.78,0,0,1,.55-.275h3.437a.78.78,0,0,1,.55.275l.825,1.1H6.531ZM16.5.687a.688.688,0,0,1-.687.687H3.437A.688.688,0,0,1,2.75.687V-15.125H16.5ZM9.281-.687h.687a.344.344,0,0,0,.344-.344V-12.719a.344.344,0,0,0-.344-.344H9.281a.344.344,0,0,0-.344.344V-1.031A.344.344,0,0,0,9.281-.687Z" transform="translate(0 19.25)" fill="#fff"/>
                  </svg>
                </div>
                </li>
              )
            })}
                        <li>
              <div className="top totals">
                <span className="first">Total</span>
                <span className="second"></span>
                <span className="third">{getTotal()}</span>
              </div>
            </li>
            </ol>
          </div>
          <button className="btn btn-outline-primary btn-block btn-cart" onClick={() => goToCheckout(true)}>Continue to Checkout</button>
          </>
          :
          <div className="cart-items empty">
            Your cart is empty.
          </div>
        }
      </div>

      
      <button className="close-menu" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M2.22-12.375l6.61-6.61,1.363-1.363a.516.516,0,0,0,0-.729L8.735-22.536a.516.516,0,0,0-.729,0L.032-14.563l-7.973-7.974a.516.516,0,0,0-.729,0l-1.459,1.459a.516.516,0,0,0,0,.729l7.974,7.974L-10.129-4.4a.516.516,0,0,0,0,.729l1.459,1.459a.516.516,0,0,0,.729,0L.032-10.187l6.61,6.61L8.006-2.214a.516.516,0,0,0,.729,0l1.459-1.459a.516.516,0,0,0,0-.729Z" transform="translate(10.28 22.687)" fill="#bfad86"/>
        </svg>
      </button>


    </div>
    </>
  )
}

export default SideNav;
