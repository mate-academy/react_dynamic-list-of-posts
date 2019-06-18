import React, { Component } from 'react';

class Comment extends Component {
  render() {
    return (
      <>
        <li key={this.props.comment.id}>
           {this.props.comment.body}
           <p><span className="author">Author:</span> {this.props.comment.name}</p>
        </li>
      </>
    );
  }
}

export default Comment;