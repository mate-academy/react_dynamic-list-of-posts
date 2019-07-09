import React from 'react'

import User from './User'
// import CommentList from ''


const Post = ({currentPost}) => {
  console.log(currentPost);
  return (
    <article>
      <h2>{currentPost.title}</h2>
      <section>{currentPost.body}</section> <br />
      <User user={currentPost.user}/>
      {/* <h5>Comments:</h5> */}
      {/* <CommentList currentComments={currentPost.comments}> */}
    </article>
  )
}

export default Post