import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {page > 1 && (
          <LinkContainer
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${page - 1}`
                  : `/page/${page - 1}`
                : `/admin/productlist/${page - 1}`
            }
          >
            <Pagination.Item>«</Pagination.Item>
          </LinkContainer>
        )}
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
        {page < pages && (
          <LinkContainer
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${page + 1}`
                  : `/page/${page + 1}`
                : `/admin/productlist/${page + 1}`
            }
          >
            <Pagination.Item>»</Pagination.Item>
          </LinkContainer>
        )}
      </Pagination>
    )
  )
}

export default Paginate
