import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Form } from 'react-bootstrap'
import FormContainer from './FormContainer'
import { createDepartment } from '../actions/departmentActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const CreateDepartment = (props) => {
  const dispatch = useDispatch()
  const departmentCreate = useSelector((state) => state.departmentCreate)
  const { loading, success, error } = departmentCreate
  const [department, setDepartment] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createDepartment({ department }))
    if (success) {
      setDepartment('')
    }
  }

  return (
    <>
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Create Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            success && <Message variant='success'>Department created</Message>
          )}
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter department name'
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary'>
                Create
              </Button>
            </Form>
          </FormContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateDepartment
