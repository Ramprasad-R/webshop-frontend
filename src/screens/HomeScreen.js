import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const department = match.params.department
  const brand = match.params.brand
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)

  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    if (department) {
      dispatch(listProducts('', department, '', pageNumber))
    } else if (brand) {
      dispatch(listProducts('', '', brand, pageNumber))
    } else {
      dispatch(listProducts(keyword, '', '', pageNumber))
    }
  }, [dispatch, keyword, pageNumber, department, brand])

  return (
    <>
      <Meta />
      {!keyword && !department && !brand && <ProductCarousel />}

      <Container>
        {keyword || department || brand ? (
          <Link to='/' className='btn btn-light'>
            Go Back
          </Link>
        ) : null}
        <h1>PRODUCTS</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message children={error} variant='danger' />
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </>
        )}
      </Container>
    </>
  )
}

export default HomeScreen
