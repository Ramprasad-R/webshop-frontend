import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Button, Form } from 'react-bootstrap'
import FormContainer from './FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductTemplateUpload = (props) => {
  // const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState('')
  const [file, setFile] = useState('')

  const uploadFileHandler = (e) => {
    const file = e.target.files[0]
    setFile(file)
    console.log(file)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setUploading(true)
    console.log('file : ', file)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        '/api/products/upload',
        formData,
        config
      )
      console.log('data : ', data)
      setUploadSuccess(data.message)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploadError(error)
      setUploading(false)
    }
  }

  const closeHandler = () => {
    setUploadError('')
    setUploadSuccess('')
    setFile('')
    props.onHide()
  }

  return (
    <>
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        onHide={closeHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Upload Product Template
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {uploadError && (
            <Message variant='danger'>
              Error processing the uploaded file, Kinly check the uploaded file
              and try again
            </Message>
          )}
          {uploadSuccess && (
            <Message variant='success'>{uploadSuccess}</Message>
          )}
          {uploading && <Loader />}
          {/* {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            success && <Message variant='success'>Products Loaded</Message>
          )} */}
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='file'>
                <Form.Label>{!file ? <>Upload File </> : file.name}</Form.Label>

                <Form.File
                  type='file'
                  id='file'
                  label='Choose File'
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
              </Form.Group>
              <Button type='submit' variant='primary'>
                Process Template
              </Button>
            </Form>
          </FormContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeHandler}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProductTemplateUpload
