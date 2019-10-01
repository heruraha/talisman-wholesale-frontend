import React, { useEffect } from 'react';
import { CTX } from 'store';
import Header from 'components/Header/Header';
import ProductListing from 'components/ProductListing/ProductListing';
import APIService from 'services/api/apiService';
import './Checkout.scss'

const Checkout = (props) => {

    document.title = `Checkout - Talisman Leather Wholesale`;

    const [appState, dispatch] = React.useContext(CTX);

    const [form, setForm] = React. useState({
      contact: {
        name: '',
        email: null,
        phone: null,
        comments: null,
        date: new Date,
        address: {
          street: null,
          city: null,
          state: null,
          zip: null
        }
      }
    })

    useEffect( () => {  
      dispatch({type: 'UPDATE_ACTIVE_SCREEN', payload: 'checkout'})
      dispatch({type: 'TOGGLE_SIDENAV', payload: false});

    }, [appState.activeScreen]);

    const updateQty = (e,i) => {
      console.log(e,i)
      dispatch({type: 'UPDATE_PRODUCT_QTY', payload: { quantity: e, index: i}  })
    }


    const getTotal = () => {
      if(appState.cart.items && appState.cart.items.length > 0) {
          let total = [];
          appState.cart.items.map(e => total.push(Number(e.product.quantity) * Number(e.productDetails.price)))
          return '$' + total.reduce((a,b) => a+b)
      } else {
        return '$0'
      }
    }

    const removeFromCart = (i)  => dispatch({type: 'REMOVE_PRODUCT_FROM_CART', payload: i})

    const handleForm = (e, val) => {
      console.log(e.target.value, val)
      //setForm({...form, contact: {...form.contact, name: e.target.value}})
    }

    return (
      <>
      <Header props={props} />
      <div className="container text-center p-0 mb-5">
      
        {appState.cart.items && appState.cart.items.length > 0 ?
          <>
          <div className="cart-items-checkout full-width mb-5">
          <h3 className="mt-4 mb-5">Checkout</h3>
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
                    <span className="second">
                    <input
                      value={e.product.quantity}
                      className="form-control"
                      onChange={(e) => updateQty(e.target.value,i)}
                      type="number" 
                      placeholder="0" 
                      min="0" 
                      max="93" />
                    </span>
                    <span className="third">${e.productDetails.price}</span>
                  </div>
                  <div className="bottom">{e.product.color} {e.product.size ?  `- ${e.product.size}` : null}</div>
                  <div className="delete" onClick={() => removeFromCart(i)}>
                    <svg width="19.25" height="22" viewBox="0 0 19.25 22">
                      <path d="M12.719-.687h.687a.344.344,0,0,0,.344-.344V-12.719a.344.344,0,0,0-.344-.344h-.687a.344.344,0,0,0-.344.344V-1.031A.344.344,0,0,0,12.719-.687Zm-6.875,0h.687a.344.344,0,0,0,.344-.344V-12.719a.344.344,0,0,0-.344-.344H5.844a.344.344,0,0,0-.344.344V-1.031A.344.344,0,0,0,5.844-.687ZM18.906-16.5H14.437l-1.444-1.925a2.323,2.323,0,0,0-1.65-.825H7.906a2.323,2.323,0,0,0-1.65.825L4.812-16.5H.344A.344.344,0,0,0,0-16.156v.687a.344.344,0,0,0,.344.344H1.375V.687A2.063,2.063,0,0,0,3.437,2.75H15.812A2.063,2.063,0,0,0,17.875.687V-15.125h1.031a.344.344,0,0,0,.344-.344v-.687A.344.344,0,0,0,18.906-16.5ZM7.356-17.6a.78.78,0,0,1,.55-.275h3.437a.78.78,0,0,1,.55.275l.825,1.1H6.531ZM16.5.687a.688.688,0,0,1-.687.687H3.437A.688.688,0,0,1,2.75.687V-15.125H16.5ZM9.281-.687h.687a.344.344,0,0,0,.344-.344V-12.719a.344.344,0,0,0-.344-.344H9.281a.344.344,0,0,0-.344.344V-1.031A.344.344,0,0,0,9.281-.687Z" transform="translate(0 19.25)" fill="#fff"/>
                  </svg>
                </div>
                </li>
              )
            })}
                        <li>
              <div className="top totals pb-0">
                <span className="first">Total</span>
                <span className="second"></span>
                <span className="third">{getTotal()}</span>
              </div>
            </li>
            </ol>
          </div>

          <div className="contact-info full-width mb-5">
          <h3 className="mt-4 mb-5">Contact Information</h3>
          <div className="row">
            <div className="col-sm-6 text-left">
              <div className="form-control-group">
                <label>Your Name</label>
                <input
                  value={form.contact.name}
                  onChange={(e) => handleForm(e, 'name')}
                  type="text" 
                  className="form-control" 
                  placeholder="First + Last" />
              </div>
              <div className="form-control-group">
                <label>Email</label>
                <input
                  value={form.contact.email}
                  onChange={(e) => handleForm(e, 'email')}
                  type="text" 
                  className="form-control" 
                  placeholder="user@email.com" />
              </div>
            </div>
            <div className="col-sm-6 text-left">
              <div className="form-control-group">
                <label>Phone Number</label>
                <input
                  value={form.contact.phone}
                  onChange={(e) => handleForm(e, 'phone')}
                  type="text" 
                  className="form-control" 
                  placeholder="(XXX) XXX-XXXX" />
              </div>
              <div className="form-control-group">
                <label>When do you need it?</label>
                <input
                  value={form.contact.date}
                  onChange={(e) => handleForm(e, 'date')}
                  type="date" 
                  className="form-control" 
                   />
              </div>
            </div>
            <div className="col-sm-12 text-left">
              <div className="form-control-group">
                <label>Notes for your order</label>
                <textarea
                  value={form.contact.comments}
                  onChange={(e) => handleForm(e, 'comments')}
                  type="text"
                  className="form-control" 
                  placeholder="Begin Typing" />
              </div>
            </div>
          </div>
          </div>


          <div className="shipping-info full-width mb-5">
            <h3 className="mt-4 mb-5">Shipping Information</h3>
            <div className="row"></div>
          </div>
          <button className="mt-6 btn btn-outline-primary btn-block btn-cart">Checkout</button>
          </>
          :
          <div className="cart-items empty">
            Your cart is empty.
          </div>
        }

      </div>
      </>
    );

}

export default Checkout;
