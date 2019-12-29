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