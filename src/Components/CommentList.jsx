import React, { Component } from 'react'
import Comment from './Comment.jsx';

export default class CommentList extends Component {
  render() {
    return (
      <Comment comments={this.props.comments}/>
    )
  }
}
