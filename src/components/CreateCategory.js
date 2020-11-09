import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Form } from 'react-bootstrap'
import FormContainer from './FormContainer'
import { createCategory } from '../actions/departmentActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const CreateCategory = (props) => {
  const dispatch = useDispatch()
  const categoryCreate = useSelector((state) => state.categoryCreate)
  const { loading, success, error } = categoryCreate
  const [category, setCategory] = useState('')
  const { departmentid } = props

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createCategory(departmentid, { category }))
    if (success) {
      setCategory('')
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
            Create Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            success && <Message variant='success'>Category created</Message>
          )}
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter category name'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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

export default CreateCategory
