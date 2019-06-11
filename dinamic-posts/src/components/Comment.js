import React, { Component } from 'react';
import './Comment.css';

class Comment extends Component {

  render() {

      return (
        <div>
          <h4>{this.props.title}</h4>
        <span className="comment-body">{this.props.body}</span>
        </div>
      );
  }
}

export default Comment;
