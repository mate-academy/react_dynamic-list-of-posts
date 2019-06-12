import React, { Component } from 'react'
import User from './User';
import CommentList from './CommentList';

export default class Post extends Component {
  render() {
    const user = this.props.post.users
    const comments = this.props.post.comments
    return (
      <div >
        <h1 key={this.props.key}>Title: {this.props.post.title} </h1>
        <p>{this.props.post.body}</p>
        <User
          user={user} />
        <CommentList comments={comments} />
      </div>
    )
  }
}
