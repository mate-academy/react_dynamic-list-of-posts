import React from 'react'
import Post from './Post'

const PostsList = ({currentPosts}) => (
  <div>
    {
      currentPosts.map(post => (
        <Post currentPost={post}/>
      ))
    }
  </div>
)

export default PostsList