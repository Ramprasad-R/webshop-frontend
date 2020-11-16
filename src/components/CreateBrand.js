import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Form } from 'react-bootstrap'
import FormContainer from './FormContainer'
import { createBrand } from '../actions/brandActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const CreateBrand = (props) => {
  const dispatch = useDispatch()
  const brandCreate = useSelector((state) => state.brandCreate)
  const { loading, success, error } = brandCreate
  const [brand, setBrand] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createBrand({ brandName: brand }))
    if (success) {
      setBrand('')
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
            Create Brand
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            success && <Message variant='success'>Brand created</Message>
          )}
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter brand name'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
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

export default CreateBrand
