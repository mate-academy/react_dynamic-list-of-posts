import React from 'react';
import './CommentList.css';
import Comment from './Comment'


function CommentList(props) {
    const {comments, postId} = props;
    const commentsForPost = comments.filter(item => {
        return item.postId === postId;
    });
    const commentsForRender = commentsForPost.map(item => {
        return (
            <Comment comment={item}
                     key={item.id}
            />
        );
    });

    return (
        <div className="comments-list">
            {commentsForRender}
        </div>
    );
}

export default CommentList;