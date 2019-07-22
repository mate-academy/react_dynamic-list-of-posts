import React from 'react'

const ButtomComments = ({toggleShowComments, showComments}) => (
  <button onClick={toggleShowComments}>
    {
      showComments
        ? 'Hide comments'
        : 'Show comments'
    }
  </button>
)

export default ButtomComments