import React, { Component } from 'react';

class Comment extends Component {
  render() {
    return (
      <section>
        <p>{this.props.text}</p>
        <p>{this.props.author}</p>
        <p><a href="#">{this.props.email}</a></p>
      </section>
    );
  }
}

export default Comment;