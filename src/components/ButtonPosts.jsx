import React from 'react'

const ButtonPosts = ({ isLoading, getData }) => (
  <button className='button__posts' onClick={getData}>
    {
      isLoading
        ? 'Loading...'
        : 'Load posts'
    }
  </button>
)

export default ButtonPosts