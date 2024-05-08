import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { usePosts } from '../providers/PostProvider';
import { useComments } from '../providers/CommentProvider';
import { CommentDetails } from './CommentDetails';

export const PostDetails: React.FC = () => {
  const { selectedPost } = usePosts();
  const { comments, isLoading, isError } = useComments();
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

  useEffect(() => {
    setShowNewCommentForm(false);
  }, [selectedPost]);

  const handleShowForm = () => setShowNewCommentForm(true);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          ) : !comments.length ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(c => (
                <CommentDetails key={c.id} comment={c} />
              ))}
            </>
          )}

          {!showNewCommentForm && !isLoading && !isError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleShowForm}
            >
              Write a comment
            </button>
          )}
        </div>

        {showNewCommentForm && <NewCommentForm />}
      </div>
    </div>
  );
};
