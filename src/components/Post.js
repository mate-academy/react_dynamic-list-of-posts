import React from 'react'
import User from './User'
import CommentList from './CommentList'

function Post(props) {
    const user = props.users.find(item => props.post.userId === item.id);
    const postComments = props.comments.filter(item => props.post.id === item.postId);
    return (
      <div className="post">
        <h3 className="post-title">{props.post.title}</h3>
        <p className="post-text">{props.post.body}</p>
        <User user={user}/>
        <CommentList comments={postComments}/>
      </div>
    )
}

export default Post;
