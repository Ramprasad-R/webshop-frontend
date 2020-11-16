import axios from 'axios'
import {
  BRAND_CREATE_FAIL,
  BRAND_CREATE_REQUEST,
  BRAND_CREATE_SUCCESS,
  BRAND_DELETE_FAIL,
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
} from '../constants/brandConstants'
import { logout } from './userActions'

export const listBrands = () => async (dispatch) => {
  try {
    dispatch({ type: BRAND_LIST_REQUEST })

    const { data } = await axios.get('/api/brands')
    dispatch({
      type: BRAND_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BRAND_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const createBrand = (brand) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BRAND_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/brands`, brand, config)

    dispatch({
      type: BRAND_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BRAND_CREATE_FAIL,
      payload: message,
    })
  }
}

export const deleteBrand = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BRAND_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/brands/${id}`, config)

    dispatch({
      type: BRAND_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({ type: BRAND_DELETE_FAIL, payload: message })
  }
}
