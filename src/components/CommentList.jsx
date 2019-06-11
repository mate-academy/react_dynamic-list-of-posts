import React, { Component } from 'react';
import Comment from './Comment';

export default class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getComments() {
    const comments = this.props.comments.filter(item =>
      item.postId === this.props.postId).map(item =>
      <Comment key={item.id} comment={item} />)
    return comments;
  }

  render() {
    return(
      <div className="comment-list">
        {this.getComments()}
      </div>
    )
  }
}
