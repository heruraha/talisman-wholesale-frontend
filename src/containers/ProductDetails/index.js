import React, { useEffect } from 'react';
import { CTX } from 'store';
import Header from 'components/Header/Header';
import APIService from 'services/api/apiService';
import Carousel from 'components/Carousel/Carousel'
import Switch from 'components/Switch/Switch'
import Modal from 'components/Modal/Modal'
import Deerskin from 'assets/img/colorchart_deer.jpg'
import Cowhide from 'assets/img/colorchart_cowhide.jpg'
import { HelpCircle } from 'react-feather'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-156063246-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const ProductDetails = (props) => {

  document.title = `Talisman Leather Wholesale`;

  const [appState, dispatch] = React.useContext(CTX);
  const [colors, setColors] = React.useState(null)
  const [altColors, setAltColors] = React.useState(null)
  const [sizes, setSizes] = React.useState(null)
  const [hardware, setHardware] = React.useState('nickel')
  const [modal, showModal] = React.useState({ active: false, img: null })

  const active = appState.activeProduct
  const [product, setProduct] = React.useState({
    size: active && active.sizes.length > 0 ? active.sizes[0] : null,
    color: active && active.color.length > 0 ? active.color[0] : null,
    color_alt: active && active.color_alt.length > 0 ? active.color_alt[0] : null,
    quantity: 1,
    price: active ? hardware.nickel ? active.price_nickel : active.price_brass : null,
    note: null,
    hardware: hardware,
  })

  //useEffect(() => setProduct(prevState => { return { ...prevState, hardware: hardware } }), [hardware])
  useEffect(() => {
    console.log(hardware);
    if (hardware === 'nickel' && active) {
      setProduct({
        ...product,
        price: parseFloat(active.price_nickel)
      })
    }

    if (hardware === 'brass' && active) {
      setProduct({
        ...product,
        price: parseFloat(active.price_brass)
      })
    }

    if (hardware === 'gold' && active) {
      setProduct({
        ...product,
        price: parseFloat(active.price_gold)
      })
    }


  }, [hardware])
  useEffect(() => {
    dispatch({ type: 'UPDATE_ACTIVE_SCREEN', payload: 'productDetails' })
    if (!appState.activeProduct) {
      dispatch({ type: 'LOADING_ENABLED' })
      APIService.getProduct(props.match.params.id)
        .then((res) => {
          console.log(res.acf)
          dispatch({ type: 'SET_ACTIVE_PRODUCT', payload: res.acf })
          dispatch({ type: 'LOADING_DISABLED' });
        })
        .catch((err) => {
          dispatch({ type: 'LOADING_DISABLED' });
          console.log(err);
        })
    } else {
      const colorOptions = appState.activeProduct.color;
      const colorAltOptions = appState.activeProduct.color_alt;
      const sizeOptions = appState.activeProduct.sizes;
      setColors(colorOptions)
      setProduct(prevState => { return { ...prevState, color: colorOptions[0], price: parseFloat(appState.activeProduct.price_nickel) } })
      if (sizeOptions.length > 0) {
        setSizes(sizeOptions)
        setProduct(prevState => { return { ...prevState, size: sizeOptions[0] } })
      }
      if (colorAltOptions.length > 0) {
        setAltColors(colorAltOptions)
        setProduct(prevState => { return { ...prevState, color_alt: colorAltOptions[0] } })
      }

    }
  }, [appState.activeProduct]);

  const addToCart = () => {
    if (product.quantity > 0) {
      const obj = {
        product,
        productDetails: appState.activeProduct
      }
      console.log(obj, 'added to cart')
      dispatch({ type: 'ADD_PRODUCT_TO_CART', payload: obj });
      dispatch({ type: 'TOGGLE_SIDENAV', payload: true });
      window.scrollTo(0, 0);
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setProduct({ ...product, quantity: e.target.value })
      addToCart()
    }
  }

  const minus = () => {
    if (product.quantity >= 1) { setProduct({ ...product, quantity: product.quantity - 1 }) }
  }
  const plus = () => setProduct({ ...product, quantity: product.quantity + 1 })


  return (
    <>
      <Header props={props} />
      <div className="container">
        <div className="products-details-wrap row">
          {appState.activeProduct ?
            <div className="col-sm-6 product-info">
              <h1>{appState.activeProduct.name}</h1>
              <p className="headline">
                {appState.activeProduct.description}
              </p>
              <h1>${product.price}</h1>

              <div id="product-options" className="d-flex flex-row">

                {sizes && sizes.length > 0 &&
                  <div className="option-wrap my-4 mr-3">
                    <label>Size</label>
                    <div className="controls d-flex flex-row">
                      <select className="form-control" value={product.size} onChange={(e) => setProduct({ ...product, size: e.target.value })}>
                        {sizes.map((e, i) => <option key={i} value={e}>{e}</option>)}
                      </select>
                    </div>
                  </div>
                }

                {colors &&
                  <div className="option-wrap my-4 mr-3">
                    <label>Color <span className="ml-2 pointer" onClick={() => showModal({ active: true, img: Cowhide })}><HelpCircle color="#bfad86" size={18} /></span></label>
                    <div className="controls d-flex flex-row">

                      <select className="form-control" value={product.color} onChange={(e) => setProduct({ ...product, color: e.target.value })}>
                        {colors.map((e, i) => <option key={i} value={e}>{e}</option>)}
                      </select>

                    </div>
                  </div>
                }

                {altColors &&
                  <div className="option-wrap my-4 mr-3">
                    <label>Accent <span className="ml-2 pointer" onClick={() => showModal({ active: true, img: Deerskin })}><HelpCircle color="#bfad86" size={18} /> </span></label>
                    <div className="controls d-flex flex-row">

                      <select className="form-control" value={product.color_alt} onChange={(e) => setProduct({ ...product, color_alt: e.target.value })}>
                        {altColors.map((e, i) => <option key={i} value={e}>{e}</option>)}
                      </select>

                    </div>
                  </div>
                }
                <div className="option-wrap my-4">
                  <label>quantity</label>
                  <div className="controls d-flex flex-row">
                    <button className="increment btn-transparent text-left" onClick={minus}>–</button>
                    <input
                      value={product.quantity}
                      onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                      onKeyPress={e => handleEnter(e)}
                      type="number"
                      className="form-control"
                      placeholder="0"
                      min="0"
                      max="93" />
                    <button className="increment btn-transparent text-right" onClick={plus}>+</button>
                  </div>
                </div>
              </div>

              {product && product.size === 'Custom' &&
                <div className="d-flex flex-row">
                  <div className="form-control-group w-50 mb-4">
                    <label>Custom Size Notes</label>
                    <input
                      onChange={(e) => setProduct({ ...product, note: e.target.value })}
                      type="text"
                      className="form-control"
                      placeholder="E.g. desired size range" />
                  </div>
                </div>
              }

              <div className="d-flex flex-row">

                <div className="option-wrap">
                  <label>Hardware</label>
                  <div className="controls d-flex flex-row">

                    <select className="form-control" value={hardware} onChange={(e) => {
                      setHardware(e.target.value);
                    }}>
                      <option value={'nickel'}>Nickel</option>
                      {active.price_brass && <option value={'brass'}>Antique Brass</option>}
                      {active.price_gold && <option value={'gold'}>Gold</option>}
                    </select>

                  </div>
                </div>

              </div>

              <button className="btn btn-outline-primary btn-block btn-cart mt-5" onClick={addToCart} disabled={product.quantity > 0 ? false : true}>Add to Cart</button>

            </div>
            :
            <div className="col-sm-6 product-info">

            </div>
          }
          {appState.activeProduct &&
            <div className="col-sm-6 product-image-wrap">
              {
                appState.activeProduct.img && appState.activeProduct.img.length > 1 ?
                  <Carousel img={appState.activeProduct.img} className="" />
                  :
                  <div className="card-img-wrap pointer">
                    {appState.activeProduct.img && appState.activeProduct.img.length > 0 ?
                      <div className="">
                        <img src={appState.activeProduct.img[0].sizes.medium_large} alt="" />
                      </div>
                      :
                      <svg width={62.7} height={54.6}>
                        <g fill="#D3D3D3">
                          <path d="M17.8 18.8c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.3-5 5 2.3 5 5 5zM42.2 26.9c-2.7 1.3-4.9 3.4-6.5 6H18c-.4 0-.9.1-1.4 0h-9v-1.1c0-2.6 2.1-4.7 4.7-4.7h8c1.1-1.5 1.9-2.7 2-2.8.7-1 1.5-1.5 2.5-1.5 1.4 0 2.1 1.5 3.2 2.1 1.4.8 2.4-.3 3-1.4.5-.7 1-1.5 1.4-2.3.3-.4.6-.9.8-1.4.3-.5.7-1.1 1-1.6l.7-1.1c.1-.1.1-.2.2-.2.3-.4.5-.6.8-.6.2 0 .5.2.7.6 1.9 3.3 3.7 6.7 5.6 10z" />
                          <path d="M0 0v41.7h33.4v-.9c0-.9.1-1.8.3-2.7H3.6V3.6h45.5v21.6h.2c1.2 0 2.3.1 3.4.4V0H0z" />
                          <path d="M49.2 27.3c-7.4 0-13.6 6.1-13.7 13.4-.1 7.7 5.8 13.8 13.4 13.9h.2c3.7 0 7.1-1.4 9.6-3.9 2.6-2.6 4-6 4-9.6.1-7.6-5.9-13.7-13.5-13.8zm-1.4 24c-4.3-.7-7.2-3.1-8.6-7.2-1.1-3.2-.6-6.4 1.5-9.3l14.6 14.6c-2.2 1.7-4.8 2.3-7.5 1.9zm9.8-4.1L43 32.6c2.4-1.8 5-2.4 7.8-1.9 4.2.7 7 3.1 8.3 7.1 1.1 3.2.6 6.4-1.5 9.4z" />
                        </g>
                      </svg>
                    }

                  </div>
              }
            </div>
          }
        </div>
      </div>
      {modal.active &&
        <Modal img={modal.img} close={() => showModal({ active: false, img: null })} />
      }
    </>
  );

}

export default ProductDetails;
