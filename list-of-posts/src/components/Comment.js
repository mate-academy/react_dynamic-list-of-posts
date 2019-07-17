import React from 'react';
import logo from '../images/user.png'

function Comment(props) {
  return (
    <div className="comment">
      <p><img src={logo} alt="user"/><a href={'mailto: ' + props.authorEmail}>{props.authorName}</a></p>
      <p className="commentText">{props.comment}</p>
    </div>
  )
}

export default Comment;
