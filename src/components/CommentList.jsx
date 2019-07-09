import React from 'react'
import Comment from './Comment'

const CommentList = ({currentComments}) => (
  <div>
    <h5>Comments:</h5>
    {
      currentComments.map(comment => (
        <Comment currentComment={comment}/>
      ))
    }
  </div>
)

export default CommentList