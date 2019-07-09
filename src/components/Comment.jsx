import React from 'react'

const Comment = ({currentComment}) => (
  <div>
    <div>{currentComment.email}</div>
    <div>{currentComment.body}</div>
  </div>
)
export default Comment