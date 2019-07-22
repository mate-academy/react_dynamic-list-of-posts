import React from 'react'

const Comment = ({ currentComment}) => (
  <div>
    <div className='comment__author'>{currentComment.email}</div>
    <div className='comment__body'>{currentComment.body}</div>
  </div>
)
export default Comment