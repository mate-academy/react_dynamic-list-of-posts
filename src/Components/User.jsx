import React, { Component } from 'react'

export default class User extends Component {
  render() {
    return (
      <div key={this.props.user.id} className="user-list">
        <span>Name: {this.props.user.name}</span>
        <span>Email: {this.props.user.email}</span>
        <span>UserName: {this.props.user.username}</span>
      </div>
    )
  }
}
