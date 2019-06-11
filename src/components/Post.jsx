import React, { Component } from 'react';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div className="post">
        <h3>{this.props.title}</h3>
        <p>{this.props.body}</p>
        {this.props.children}
        {this.props.comments}
      </div>
    )
  }
}
