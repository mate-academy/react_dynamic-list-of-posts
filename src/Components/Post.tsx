import React from 'react';
import { Post } from '../helper/api';
import { CommentCard } from './Comment';


export const PostCard = ({
  title, user, body, commentList,
}: Post) => (
  <div className="blog-post">
    <h3>{title}</h3>
    <p className="user text-primary">{user ? user.name : 'Unknown'}</p>
    <p className="blog-body">{body}</p>
    <div className="comment-list">
      {commentList ? (commentList.map(comment => (
        <CommentCard key={comment.id} {...comment} />
      ))
      ) : null}
    </div>
  </div>
);
