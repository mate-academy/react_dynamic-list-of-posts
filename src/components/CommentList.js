import React from 'react';
import Comment from './Comment'

function CommentList(props) {
    return (
        <div>
            {props.comments.map(comment => Comment(comment))}
        </div>
    );
}

export default CommentList;
