const environment = 'dev';

export const API_URL = environment === 'dev' ? 'http://talisman.newaeoncreative.com/wp-json': 'http://dev.talismanleather.io/';

export const ENDPOINTS = {
    GET_PRODUCTS: '/kink_products/v1/post',
    GET_PRODUCT: '/acf/v3/posts',
}