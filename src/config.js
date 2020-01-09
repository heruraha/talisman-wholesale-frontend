const environment = 'dev';

export const API_URL = environment === 'dev' ? 'https://talisman.newaeoncreative.com/wp-json': 'http://dev.talismanleather.io/';

export const ENDPOINTS = {
    GET_PRODUCTS: '/kink_products/v1/post',
    GET_PRODUCT: '/acf/v3/posts',
    POST_ORDER: '/contact-form-7/v1/contact-forms/432/feedback',
}