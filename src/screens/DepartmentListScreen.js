import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import CreateDepartment from '../components/CreateDepartment'
import { listDepartments, deleteDepartment } from '../actions/departmentActions'

const DepartmentListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const [createDepartmentModal, setCreateDepartmentModal] = useState(false)
  const departmentList = useSelector((state) => state.departmentList)
  const { loading, error, departments } = departmentList
  const departmentDelete = useSelector((state) => state.departmentDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = departmentDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listDepartments())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteDepartment(id))
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Departments</h1>
        </Col>
        <Col className='text-right'>
          <Button
            className='my-3'
            onClick={() => setCreateDepartmentModal(true)}
          >
            <i className='fas fa-plus'></i> Create Department
          </Button>
        </Col>
      </Row>
      <CreateDepartment
        show={createDepartmentModal}
        onHide={() => {
          setCreateDepartmentModal(false)
          dispatch(listDepartments())
        }}
      />
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {successDelete && <Message variant='success'>Department Deleted</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DEPARTMENT</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department._id}>
                <td>{department._id}</td>
                <td>{department.department}</td>
                <td>
                  <LinkContainer
                    to={`/admin/department/${department._id}/edit`}
                  >
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(department._id)}
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

export default DepartmentListScreen
