import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { PostContext } from '../context/PostProvider';
import { CommentContext } from '../context/CommentProvider';
import { CommentItem } from './CommentItem';

export const PostDetails: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { selectedPost } = useContext(PostContext);
  const { comments, isLoading, isError } = useContext(CommentContext);

  useEffect(() => {
    setShowForm(false);
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0 && !isLoading && !isError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && !isLoading && (
            <p className="title is-4">Comments:</p>
          )}

          {comments.length > 0 &&
            comments.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))}

          {!showForm && !isLoading && !isError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShowForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {showForm && <NewCommentForm />}
      </div>
    </div>
  );
};
