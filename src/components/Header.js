import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { listDepartments } from '../actions/departmentActions'
import { listBrands } from '../actions/brandActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const departmentList = useSelector((state) => state.departmentList)
  const { departments } = departmentList

  const brandList = useSelector((state) => state.brandList)
  const { brands } = brandList

  useEffect(() => {
    dispatch(listDepartments())
    dispatch(listBrands())
  }, [dispatch])

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                src='/kaveris_logo.svg'
                className='d-inline-block align-top'
                width='150'
                height='150'
                alt='logo'
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              {departments.length > 0 && (
                <NavDropdown title='Products' id='username'>
                  {departments.map((department) => (
                    <LinkContainer to={`/department/${department.department}`}>
                      <NavDropdown.Item>
                        {department.department}
                      </NavDropdown.Item>
                    </LinkContainer>
                  ))}
                </NavDropdown>
              )}
              {brands.length > 0 && (
                <NavDropdown title='Brands' id='username'>
                  {brands.map((brand) => (
                    <LinkContainer to={`/brand/${brand.brandName}`}>
                      <NavDropdown.Item>{brand.brandName}</NavDropdown.Item>
                    </LinkContainer>
                  ))}
                </NavDropdown>
              )}
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/departmentlist'>
                    <NavDropdown.Item>Departments</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/brandlist'>
                    <NavDropdown.Item>Brands</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
