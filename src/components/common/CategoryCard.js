import React from 'react'

const CategoryCard = ({ categoryName }) => {
  return (
    <div
      className="column is-one-fifth has-text-weight-semibold"
    >
      <p className="card has-text-centered">{categoryName}</p>
    </div>
  )
}

export default CategoryCard
