import React from 'react'

const ButtonPosts = ({ isLoading, getData }) => (
  <button onClick={getData}>
    {
      isLoading
        ? 'Loading...'
        : 'Load posts'
    }
  </button>
)

export default ButtonPosts