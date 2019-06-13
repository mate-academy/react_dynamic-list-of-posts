import React from 'react'


class Comment extends React.Component {
  render () {
    return (
      <div className="comment">
        <h5 className="comment-name">{this.props.name}</h5>
        <p className="comment-email"><a href={`mailto:${this.props.email}`}>{this.props.email}</a></p>
        <p className="comment-body">{this.props.body}</p>
      </div>
    );
  }
}

export default Comment;
