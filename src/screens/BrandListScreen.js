import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import CreateBrand from '../components/CreateBrand'
import { listBrands, deleteBrand } from '../actions/brandActions'
import { BRAND_CREATE_RESET } from '../constants/brandConstants'

const BrandListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const [createBrandModal, setCreateBrandModal] = useState(false)
  const brandList = useSelector((state) => state.brandList)
  const { loading, error, brands } = brandList
  const brandDelete = useSelector((state) => state.brandDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = brandDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: BRAND_CREATE_RESET })
    if (userInfo && userInfo.isAdmin) {
      dispatch(listBrands())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteBrand(id))
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Brands</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={() => setCreateBrandModal(true)}>
            <i className='fas fa-plus'></i> Create Brand
          </Button>
        </Col>
      </Row>
      <CreateBrand
        show={createBrandModal}
        onHide={() => {
          setCreateBrandModal(false)
          dispatch(listBrands())
          dispatch({ type: BRAND_CREATE_RESET })
        }}
      />
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
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
            {brands.map((brand) => (
              <tr key={brand._id}>
                <td>{brand._id}</td>
                <td>{brand.brandName}</td>
                <td>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(brand._id)}
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

export default BrandListScreen
