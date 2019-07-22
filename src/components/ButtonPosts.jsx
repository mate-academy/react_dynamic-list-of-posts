import React from 'react'

const ButtonPosts = ({ isLoading, getData }) => (
  <button 
    className='button__posts' 
    onClick={getData}
    disabled={isLoading}
    >
    {
      isLoading
        ? 'Loading...'
        : 'Load posts'
    }
  </button>
)

export default ButtonPosts