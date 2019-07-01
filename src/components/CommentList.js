import React from "react";
import '../App.css';
import Comment from './Comment'

const CommentList = ({postId, comments, showComments, postItems}) => (
  <div className="comment-list">
    <button
      className="comment-btn"
      onClick={() => showComments(postId)}
    >
      {comments.length} comments
    </button>
    <div className={postItems[postId] ? "" : "hide-comments"}>
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  </div>
)

export default CommentList;