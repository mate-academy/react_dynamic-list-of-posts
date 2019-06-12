import React from 'react';
import '../css/Comment.css';

class Comment extends React.Component {
  render() {
    return (
      <div className='comment'>
        <h4>{this.props.comment.name}</h4>
        <p>{this.props.comment.body}</p>
        <a href={`mailto: ${this.props.comment.email}`}>{this.props.comment.email}</a>
      </div>
    )
  }
}
export default Comment;
