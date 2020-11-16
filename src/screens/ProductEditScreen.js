import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { listDepartments } from '../actions/departmentActions'
import { listBrands } from '../actions/brandActions'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [department, setDepartment] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [promotionalPrice, setPromotionalPrice] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  const departmentList = useSelector((state) => state.departmentList)
  const {
    loading: loadingDepartment,
    error: errorDepartment,
    departments,
  } = departmentList

  const brandList = useSelector((state) => state.brandList)
  const { loading: loadingBrand, error: errorBrand, brands } = brandList

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
        dispatch(listDepartments())
        dispatch(listBrands())
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setDepartment(product.department)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
        setPromotionalPrice(product.promotionalPrice)
      }
    }
  }, [
    dispatch,
    history,
    productId,
    product,
    successUpdate,
    departments,
    brands,
  ])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const listCategory =
    departments &&
    department &&
    departments.filter((dept) => dept.department === department)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        promotionalPrice,
        image,
        brand,
        department,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {(loadingUpdate || loadingDepartment || loadingBrand) && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {errorDepartment && (
          <Message variant='danger'>{errorDepartment}</Message>
        )}
        {errorBrand && <Message variant='danger'>{errorBrand}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='promotionalPrice'>
              <Form.Label>Promotional price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter promotional price'
                value={promotionalPrice}
                onChange={(e) => setPromotionalPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                as='select'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                {brands.map((brand) => (
                  <option key={brand._id} value={brand.brandName}>
                    {brand.brandName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='department'>
              <Form.Label>Department</Form.Label>
              <Form.Control
                type='text'
                as='select'
                placeholder='Enter department'
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                {departments.map((department) => (
                  <option key={department._id} value={department.department}>
                    {department.department}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                as='select'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {listCategory.length > 0 &&
                  listCategory[0].categories.length > 0 &&
                  listCategory[0].categories.map((category) => (
                    <option key={category._id} value={category.department}>
                      {category.category}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
