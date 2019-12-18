import request from './request'
import { ENDPOINTS } from 'config'

const getAllProducts = (num) => {
  return request({
    url:    `${ENDPOINTS.GET_PRODUCTS}`, 
    method: 'GET'
  });
}

const getProduct = (id) => {
  return request({
    url:    `${ENDPOINTS.GET_PRODUCT}/${id}`,
    method: 'GET'
  });
}



const APIService = {
  getAllProducts, getProduct
}

export default APIService;
