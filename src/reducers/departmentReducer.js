import {
  DEPARTMENT_CREATE_FAIL,
  DEPARTMENT_CREATE_REQUEST,
  DEPARTMENT_CREATE_RESET,
  DEPARTMENT_CREATE_SUCCESS,
  DEPARTMENT_LIST_FAIL,
  DEPARTMENT_LIST_REQUEST,
  DEPARTMENT_LIST_SUCCESS,
  DEPARTMENT_DELETE_REQUEST,
  DEPARTMENT_DELETE_SUCCESS,
  DEPARTMENT_DELETE_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_RESET,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
} from '../constants/departmentConstants'

export const departmentListReducer = (state = { departments: [] }, action) => {
  switch (action.type) {
    case DEPARTMENT_LIST_REQUEST:
      return { loading: true, departments: [] }
    case DEPARTMENT_LIST_SUCCESS:
      return {
        loading: false,
        departments: action.payload,
      }
    case DEPARTMENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const departmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTMENT_CREATE_REQUEST:
      return { loading: true }
    case DEPARTMENT_CREATE_SUCCESS:
      return { loading: false, success: true, department: action.payload }
    case DEPARTMENT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case DEPARTMENT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const departmentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTMENT_DELETE_REQUEST:
      return { loading: true }
    case DEPARTMENT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case DEPARTMENT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const departmentDetailsReducer = (
  state = { department: { categories: [] } },
  action
) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { ...state, loading: true }
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, department: action.payload }
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true }
    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true }
    case CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CATEGORY_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true }
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
