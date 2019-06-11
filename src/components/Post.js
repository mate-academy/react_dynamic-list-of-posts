import React, { Component } from 'react';
import User from './User';
import CommentList from './CommentList';
export default class Post extends Component {
  render() {
    return (
      <tr>
        <td>{
          this.props.data.title}
        </td>
        <td>{
          this.props.data.body}
        </td>
        <User author={this.props.data.users} />
        <CommentList comments={this.props.data.comments} />
      </tr>
    );
  }
}
