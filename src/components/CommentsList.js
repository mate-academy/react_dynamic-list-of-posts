import React, { Component } from 'react';

class CommentsList extends Component {
  render() {
    const {
      comment: {
        name, email, body,
      },
    } = this.props;

    return (
      <div>
        <h4>{name}</h4>
        <a href={`mailto:${email}`} className="mail__link">{email}</a>
        <p>{body}</p>
      </div>
    );
  }
}

export default CommentsList;
