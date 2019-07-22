import React from 'react'

const ButtomComments = ({showCommentsFunc, showComments}) => (
  <button onClick={showCommentsFunc}>
    {
      showComments
        ? 'Hide comments'
        : 'Show comments'
    }
  </button>
)

export default ButtomComments