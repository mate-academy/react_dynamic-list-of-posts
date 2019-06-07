import React, { Component } from 'react';

class Comment extends Component {

  render() {

      return (
        <div>
          <h4>{this.props.title}</h4>
          <h6>{this.props.body}</h6>
        </div>
      );
  }
}

export default Comment;
