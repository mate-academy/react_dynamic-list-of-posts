import React from 'react'

import User from './User'
import CommentList from './CommentList'


const Post = ({currentPost}) => {
  console.log(currentPost);
  return (
    <article className='article'>
      <h2 className='article__title'>{currentPost.title}</h2>
      <section className='article__body'>{currentPost.body}</section> <br />
      <User user={currentPost.user}/>
      <h5>Comments:</h5>
      <CommentList currentComments={currentPost.comments} />
    </article>
  )
}

export default Post