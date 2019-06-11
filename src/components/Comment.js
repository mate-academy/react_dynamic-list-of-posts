import React, { Component } from 'react';

export default class Comment extends Component {
  render() {
    return (
       <div>
        <h3>{this.props.comments.name}</h3>
        <p>{this.props.comments.body}</p>
        <p>{this.props.comments.email}</p>
      </div>
   );
  }
}
