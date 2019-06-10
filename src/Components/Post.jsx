import React, { Component } from 'react'
import User from './User.jsx';
import CommentList from './CommentList.jsx';

export default class Post extends Component {
  render() {
    const user = this.props.post.users;
    const comments = this.props.post.comments;
    return (
      <div key={this.props.post.id} className="post-list">
        <h3><span className="post--dec">Post: </span>{this.props.post.title}</h3>
        <p><span className="post--dec">Body: </span> {this.props.post.body}</p>
        <User user={user}/>
        <CommentList comments={comments}/>
      </div>
    )
  }
}
