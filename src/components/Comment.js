import React from 'react';
import './Comment.css';

function Comment(props) {
    const { name, email, body } = props.comment;
    return (
        <div className="comment-item">
            <div className="name">{name}</div>
            <div className="email">{email}</div>
            <div className="body">{body}</div>
        </div>
    );
}

export default Comment;
