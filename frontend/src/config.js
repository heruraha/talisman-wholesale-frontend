const environment = 'dev';

export const API_URL = environment === 'dev' ? 'http://localhost:4000': 'http://dev.talismanleather.io/';

export const ENDPOINTS = {
    GET_PRODUCTS: '/products',
    GET_PRODUCT: '/product/',
    POST_PRODUCT: '/product/',
    PATCH_PRODUCT: '/product/',
    DELETE_PRODUCT: '/product/',
}