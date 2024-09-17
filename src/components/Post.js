import React from 'react';
import User from './User';
import CommentList from './CommentList';
import  './Post.css';

function Post(props) {
    return (
        <div key={props.title}>
            <h2>{props.title}</h2>
            <p>{props.body}</p>
            <User name={props.user.name}
                  email={props.user.email}
                  address={props.user.address['city']}
            />
            <CommentList comments={props.comments} />
        </div>
    );
}

export default Post;
