import React from 'react';
import './Post.css';
import User from './User';
import CommentsList from './CommentList';


function Post(props) {
    const {user, title, body, id, comments} = props;
    return (
        <div className='post'>
            <User user={user}/>
            <div className='post-body'>
                <div className='title'>{title}</div>
                <div className='body'>{body}</div>
            </div>
            <CommentsList postId={id} comments={comments}/>
        </div>
    );
}

export default Post;
