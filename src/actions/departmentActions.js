import axios from 'axios'
import {
  DEPARTMENT_CREATE_REQUEST,
  DEPARTMENT_CREATE_SUCCESS,
  DEPARTMENT_CREATE_FAIL,
  DEPARTMENT_LIST_REQUEST,
  DEPARTMENT_LIST_SUCCESS,
  DEPARTMENT_LIST_FAIL,
  DEPARTMENT_DELETE_REQUEST,
  DEPARTMENT_DELETE_SUCCESS,
  DEPARTMENT_DELETE_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
} from '../constants/departmentConstants'
import { logout } from './userActions'

export const listDepartments = () => async (dispatch) => {
  try {
    dispatch({ type: DEPARTMENT_LIST_REQUEST })

    const { data } = await axios.get('/api/departments')
    dispatch({
      type: DEPARTMENT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DEPARTMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const createDepartment = (department) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEPARTMENT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/departments`, department, config)

    dispatch({
      type: DEPARTMENT_CREATE_SUCCESS,
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
      type: DEPARTMENT_CREATE_FAIL,
      payload: message,
    })
  }
}

export const deleteDepartment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEPARTMENT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/departments/${id}`, config)

    dispatch({
      type: DEPARTMENT_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({ type: DEPARTMENT_DELETE_FAIL, payload: message })
  }
}

export const listDepartmentDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST })

    const { data } = await axios.get(`/api/departments/${id}`)
    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const createCategory = (departmentId, category) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(
      `/api/departments/${departmentId}/categories`,
      category,
      config
    )

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
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
      type: CATEGORY_CREATE_FAIL,
      payload: message,
    })
  }
}

export const deleteCategory = (departmentId, categoryId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    console.log(departmentId, categoryId, config)

    await axios.put(
      `/api/departments/${departmentId}/categories`,
      categoryId,
      config
    )

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({ type: CATEGORY_DELETE_FAIL, payload: message })
  }
}
