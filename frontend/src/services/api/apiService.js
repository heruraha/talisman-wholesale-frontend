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

const postProduct = (id) => {
  return request({
    url:    `${ENDPOINTS.POST_PRODUCT}`,
    method: 'POST',
    data: id
  });
}

const patchProduct = (id) => {
  return request({
    url:    `${ENDPOINTS.PATCH_PRODUCT}`,
    method: 'PATCH',
    data: id
  });
}

const deleteProduct = (id) => {
  return request({
    url:    `${ENDPOINTS.DELETE_PRODUCT}`,
    method: 'delete',
    data: id
  });
}

const APIService = {
  getAllProducts, getProduct, postProduct, patchProduct, deleteProduct
}

export default APIService;
