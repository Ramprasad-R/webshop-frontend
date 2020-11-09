import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  deleteCategory,
  listDepartmentDetails,
} from '../actions/departmentActions'
import CreateCategory from '../components/CreateCategory'

const DepartmentEditScreen = ({ history, match }) => {
  const departmentId = match.params.id
  const [createCategoryModal, setCreateCategoryModal] = useState(false)
  const dispatch = useDispatch()
  const departmentDetails = useSelector((state) => state.departmentDetails)
  const { loading, error, department } = departmentDetails
  const categoryDelete = useSelector((state) => state.categoryDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = categoryDelete
  const { categories } = department
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listDepartmentDetails(departmentId))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, departmentId, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteCategory(departmentId, { categoryId: id }))
    }
  }

  return (
    <>
      <Link to='/admin/departmentlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <Row className='align-items-center'>
        <Col>
          <h1>{department.department}</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={() => setCreateCategoryModal(true)}>
            <i className='fas fa-plus'></i> Create Category
          </Button>
        </Col>
      </Row>
      <CreateCategory
        departmentid={departmentId}
        show={createCategoryModal}
        onHide={() => {
          setCreateCategoryModal(false)
          dispatch(listDepartmentDetails(departmentId))
        }}
      />
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {successDelete && <Message variant='success'>Category Deleted</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>CATEGORY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.category}</td>
                <td>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(category._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default DepartmentEditScreen
