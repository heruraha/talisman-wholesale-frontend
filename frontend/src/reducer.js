const reducer = (state, action) => {
    switch(action.type){
        case 'TOGGLE_SIDENAV':
            return {
            ...state,
            navOpen: action.payload
            }
        case 'UPDATE_ACTIVE_SCREEN':
            return {
            ...state,
            activeScreen: action.payload
            }
        case 'LOADING_ENABLED':
            return {
            ...state,
            loading: true
            }
        case 'LOADING_DISABLED':
            return {
            ...state,
            loading: false
            }
        case 'GET_ALL_PRODUCTS':
            return {
            ...state,
            products: action.payload
            }
        case 'SET_ACTIVE_PRODUCT':
            return {
            ...state,
            activeProduct: action.payload
            }
        case 'ADD_PRODUCT_TO_CART':
            return {
            ...state,
            cart: {
                ...state.cart,
                items: [
                    ...state.cart.items,
                    action.payload
                ]
            }
            }
        case 'REMOVE_PRODUCT_FROM_CART':
            return {
            ...state,
            cart: {
                ...state.cart,
                items: [
                    action.payload
                ]
            }
            }  
        default:
            throw Error('reducer error');
    }
}

export default reducer;
