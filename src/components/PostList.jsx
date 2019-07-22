import React from 'react'
import Post from './Post'

const PostList = ({currentPosts, inputValue, searchByFilter, filteredPosts}) => (
  <div>
    <label className='search' htmlFor="">
      Search: 
      <input className='search__field' value={inputValue} onChange={searchByFilter} type="text"/>
    </label>
    {
      filteredPosts.map(post => (
        <Post 
          currentPost={post}
          key={post.id}
        />
      ))
    }
  </div>
)

export default PostList