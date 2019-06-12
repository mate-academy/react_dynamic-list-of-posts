import React, { Component } from 'react'

export default class Comment extends Component {
  render() {
    return (
        <p key={this.props.id}>Comments: {this.props.comments.body}</p>
    )
  }
}
