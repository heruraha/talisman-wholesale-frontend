import React from 'react';
import reducer from 'reducer';

const CTX = React.createContext();

const initialState = {
    navOpen: false,
    title: 'Talisman Leather Wholesale',
    activeScreen: null,
    loading: false,
    products: null,
    activeProduct: null,
    cart: {
        items: [
            // {
            //     product: {
            //         size:"Small/Medium",
            //         color:"Rose Gold",
            //         quantity:1,
            //         price: 100,
            //     },
            //     productDetails:  {
            //         "sku": "t0003",
            //         "name": "Rhea Chest Harness",
            //         "description": "Elegant split strap harness with a cascade of chains and freshwater pearls",
            //         "sizes": "sm, l",
            //         "colors": "Rose Gold, Black (soft), Black (smooth), Black Bullhide, Oxblood, Brandy, Red, Purple, Saddle, Chocolate, Mahogany, Walnut, Blue",
            //         "img_url": null
            //       }
            // },
            // {
            //     product: {
            //         size:"Small/Medium",
            //         color:"Rose Gold",
            //         quantity:3,
            //         price: 100,
            //     },
            //     productDetails:{
            //         "sku": "t0004",
            //         "name": "Hera Chest Harness",
            //         "price": 75,
            //         "description": "Elegant split strap harness",
            //         "sizes": "sm, l",
            //         "colors": "Rose Gold, Black (soft), Black (smooth), Black Bullhide, Oxblood, Brandy, Red, Purple, Saddle, Chocolate, Mahogany, Walnut, Blue",
            //         "img_url": null
            //       }
            // }
        ],
        total: null
    },
    user: {
        name: null,
        email: null,
        phone: null,
        message: null
    }
}

const Store = (props) => {
    const stateHook = React.useReducer(reducer,initialState)
    return (
        <CTX.Provider value={stateHook}>
            {props.children}
        </CTX.Provider>
    )
}

export { CTX }
export default Store;