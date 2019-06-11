import React, { Component } from 'react';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div className="comment">
        <div>
          <a href={`mailto:${this.props.comment.email}`}>
            {this.props.comment.name}</a>
          <p>{this.props.comment.body}</p>
        </div>
      </div>
    )
  }
}
