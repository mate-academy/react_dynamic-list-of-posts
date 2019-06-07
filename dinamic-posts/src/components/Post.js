import React, { Component } from 'react';
import User from './User';
import CommentList from './CommentList';

class Post extends Component {

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <span>{this.props.body}</span>
        <User {...this.props.user}/>
        <CommentList postComments={this.props.postComments} />
        <hr/>
      </div>
    );
  }
}

export default Post;
