import React, { useContext, useEffect } from 'react';
import { CommentItem } from './CommentItem';
import { UsersContext } from '../Users/UserContext';
import { CommentsContext } from './CommentContext';
import { PostsContext } from '../Posts/PostContext';

export const CommentsList: React.FC = () => {
  const { comments } = useContext(CommentsContext);
  const { selectedUser } = useContext(UsersContext);
  const { setFormIsVisible } = useContext(PostsContext);

  useEffect(
    () => setFormIsVisible(false),
    [selectedUser, setFormIsVisible],
  );

  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(comment => (
        <CommentItem item={comment} key={comment.id} />
      ))}
    </>
  );
};
