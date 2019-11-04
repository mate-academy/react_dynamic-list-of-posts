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
        <h4 className="comment__header">{name}</h4>
        <a href={`mailto:${email}`} className="mail__link">{email}</a>
        <p className="comment__body">{body}</p>
      </div>
    );
  }
}

export default CommentsList;
