import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {

  render() {
    const postCommentsDiv = this.props.postComments.map((comment, i) => <Comment {...comment} key={i} />);

    return (
      <div>{postCommentsDiv}</div>
    );
  }
}

export default CommentList;
