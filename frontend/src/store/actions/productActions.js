import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL
} from '../types';
import axios from 'axios';

export const listProducts = () => (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        //    const {data} = await axios.get('/api/products')  
        //    still not working async/await
        axios.get('/api/products')
            .then((resp) => {
                dispatch({
                    type: PRODUCT_LIST_SUCCESS,
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: PRODUCT_LIST_FAIL,
                    payload: error.response && error.response.data.message ? error.response.data.message : error.message
                })
            })
    }
    catch (err) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}




export const listProductDetails = (id) => (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        //    const {data} = await axios.get('/api/products')  
        //    still not working async/await
        axios.get(`/api/products/${id}`)
            .then((resp) => {
                dispatch({
                    type: PRODUCT_DETAILS_SUCCESS,
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: PRODUCT_DETAILS_FAIL,
                    payload: error.response && error.response.data.message ? error.response.data.message : error.message
                })
            })
    }
    catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}