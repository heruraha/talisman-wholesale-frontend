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

const postOrder = (order) => {
  return request({
    url: `${ENDPOINTS.POST_ORDER}`,
    method: 'POST',
    data: order,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
}



const APIService = {
  getAllProducts, getProduct, postOrder
}

export default APIService;
