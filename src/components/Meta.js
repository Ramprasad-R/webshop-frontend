import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Cauvery Stores - Singapore',
  description: 'We sell the best products for cheap',
  keywords:
    'indian grocery , cheap grocery, spice, fresh indian vegetables, indian curry',
}

export default Meta
