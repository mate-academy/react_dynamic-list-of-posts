import React, { Component } from 'react';
import User from './User';

export default class Post extends Component {
  render() {
    return (
      <div className="article">
        <h2>{this.props.data.title}</h2>
        <User author={this.props.data.user} />
        <p>{this.props.data.body}</p>
      </div>
    );
  }
}
