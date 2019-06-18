import React, { Component } from 'react';
import CommentList from './CommentList.js';
import User from './User.js';


class Post extends Component {
 render() {
    return (
      <article>
        <h4>Title: {this.props.post.title}</h4>
        <h5><User user={this.props.user}/></h5>
        <p>{this.props.post.body}</p>
        <CommentList comments={this.props.comments}/>
      </article>
    );
  }
}

export default Post;