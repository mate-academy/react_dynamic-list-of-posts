import React from 'react'

const User = ({user}) => (
  <div className='article__author'>
    author: {user.name}
    email: {user.email}
    from: {user.address.city}
  </div>
)

export default User