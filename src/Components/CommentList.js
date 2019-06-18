import React, { Component } from 'react';
import Comment from './Comment.js';

class CommentList extends Component {
  render() {
    return (
      <ol>Comments:
        {this.props.comments.map(comment => <Comment comment={comment} key={comment.id}/>)}
      </ol>
    );
  }
}

export default CommentList;