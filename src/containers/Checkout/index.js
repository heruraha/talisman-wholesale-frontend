import React, { useEffect } from 'react';
import { CTX } from 'store';
import Header from 'components/Header/Header';
import { USAStates } from 'services/util';
import APIService from 'services/api/apiService';
import './Checkout.scss'

const Checkout = (props) => {

    document.title = `Checkout - Talisman Leather Wholesale`;

    const [appState, dispatch] = React.useContext(CTX);

    const [form, setForm] = React.useState({
        name: 'Mister V',
        email: 'thelastpulse@gmail.com',
        phone: 8187877777,
        comments: 'ok',
        payment: 'venmo',
        address_street: '3151 dap',
        address_city: 'new orleans',
        address_state: 'la',
        address_zip: 70117
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
          appState.cart.items.map(e => total.push(Number(e.product.quantity) * Number(e.product.price)))
          return '$' + total.reduce((a,b) => a+b)
      } else {
        return '$0'
      }
    }

    const removeFromCart = (i)  => dispatch({type: 'REMOVE_PRODUCT_FROM_CART', payload: i})

    const handleForm = (e, val) => {
      console.log(e.target.value, val)
      setForm({...form, [val]: e.target.value})
    }

    const validateForm = () => {
      const {name, email, phone, comments, payment, address_street, address_city , address_state , address_zip} = form;

      if(name && email && phone && comments && payment && address_street && address_city && address_state && address_zip) {
const body = new FormData();
const products = appState.cart.items.map(e => {
return `
${e.productDetails.name} - ${e.product.quantity} @  $${e.product.price}
${e.product.color} ${e.product.color_alt ?  '+ '+ e.product.color_alt : ''} ${e.product.size ?  '- '+ e.product.size : ''} ${e.product.nickel_hardware ? '- Nickel' : '- Antique Brass'}
${e.product.note ? 'Note: '+e.product.note : ''}
`
})

const orderBody = 
`${products}
-----------------------------------------------------------
Total ${getTotal()}
Payment method: ${payment}
`
      
        const shippingBody = `
        ${name}
        ${address_street}
        ${address_city}, ${address_state} ${address_zip}
        `
        body.append('your-name', name)
        body.append('your-email', email)
        body.append('your-tel', phone)
        body.append('your-message', orderBody)
        body.append('your-shipping', shippingBody)

        APIService.postOrder(body)
        .then(res => {
          console.log(res, 'posted')
          console.log(body, 'body to p[ost')
        })
        .catch(err => console.log(err))
      }
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
                    <span className="third">${e.product.price}</span>
                  </div>
                  <div className="bottom">{e.product.color} {e.product.color_alt &&  `+ ${e.product.color_alt} `} {e.product.size &&  `- ${e.product.size}`} {e.product.nickel_hardware ? `- Nickel` : `- Antique Brass`}
                  {e.product.note && <span className="d-flex">Note: {e.product.note}</span>}
                  </div>
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
                  //value={form.contact.name}
                  onChange={(e) => handleForm(e, 'name')}
                  type="text" 
                  className="form-control" 
                  placeholder="First + Last" />
              </div>
              <div className="form-control-group">
                <label>Email</label>
                <input
                  //value={form.contact.email}
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
                  //value={form.contact.phone}
                  onChange={(e) => handleForm(e, 'phone')}
                  type="tel" 
                  className="form-control" 
                  placeholder="(XXX) XXX-XXXX" />
              </div>
              <div className="form-control-group option-wrap">
                <label>How would you like to be invoiced?</label>
                <div className="controls">

                
                <select 
                  className="form-control" 
                  onChange={(e) => handleForm(e, 'payment')}>
                  <option value={'direct_deposit'}>Direct Deposit</option>
                  <option value={'venmo'}>Venmo</option>
                  <option value={'square'}>Square</option>
                </select>
          { form.payment === 'square' && <small class="form-text gold">A 2.9% fee will be added to square invoices</small> }
          </div>
              </div>
            </div>
            <div className="col-sm-12 text-left">
              <div className="form-control-group">
                <label>Notes for your order</label>
                <textarea
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
            <div className="row">
              <div className="col-sm-12 text-left">
                <div className="form-control-group">
                  <label>Address</label>
                  <input
                    onChange={(e) => handleForm(e, 'address_street')}
                    type="text" 
                    className="form-control" 
                    placeholder="Street" />
                </div>
              </div>
              <div className="col-sm-6 text-left">
                <div className="form-control-group">
                  <label>City</label>
                  <input
                    onChange={(e) => handleForm(e, 'address_city')}
                    type="text" 
                    className="form-control" 
                    placeholder="" />
                </div>
              </div>
              <div className="col-sm-3 text-left">
                <div className="form-control-group option-wrap">
                  <label>State</label>
                  <div className="controls">
                  <select 
                  className="form-control" 
                  onChange={(e) => handleForm(e, 'address_state')}>
                    {USAStates.map( (e,i) => <option key={i} value={e.value}>{e.name}</option>)}
                  </select>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 text-left">
                <div className="form-control-group">
                  <label>Zip</label>
                  <input
                    onChange={(e) => handleForm(e, 'address_zip')}
                    type="text" 
                    className="form-control" 
                    placeholder="" />
                </div>
              </div>              
            </div>
            
          </div>
          <button className="mt-6 btn btn-outline-primary btn-block btn-cart" onClick={validateForm}>Checkout</button>
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
