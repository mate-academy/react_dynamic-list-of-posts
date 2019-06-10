import React, { Component } from 'react'

export default class Comment extends Component {
  render() {
    return (
      <div key={this.props.id}>
        <div className="comments">
          <a href={this.props.comments.email}>
            {this.props.comments.name}
          </a>
          <span>{this.props.comments.body}</span>
        </div>
      </div>
    )
  }
}
