import React from "react";
import '../App.css';

const User = ({user, post}) => (
  <div>
    <div className="user-name">{user.name}</div>
    <div className="user-email">{user.email}</div>
    <div className="user-address">{user.address.city}, {user.address.street}, {user.address.suite}</div>
    <h2 className="post-title">{post.title}</h2>
    <div className="post-body">{post.body}</div>
  </div>
)

export default User;