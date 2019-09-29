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
        default:
            throw Error('reducer error');
    }
}

export default reducer;
