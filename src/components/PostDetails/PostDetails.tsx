import React, { useContext, useEffect, useState } from 'react';
import './PostDetails.scss';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { StateContext } from '../../store/store';
import { getComments } from '../../api/api';
import { Comment } from '../../types/Comment';
import { CommentItem } from '../CommentItem/CommentItem';

export const PostDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const { selectedPost } = useContext(StateContext);

  useEffect(() => {
    if (selectedPost) {
      setIsLoading(true);
      setShowForm(false);

      getComments(selectedPost.id)
        .then(res => setComments(res))
        .catch(() => setErrorMessage('Something went wrong'))
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {` #${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoading
            ? (<Loader />)
            : (
              <div className="wrapper">
                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="CommentsError"
                  >
                    {errorMessage}
                  </div>
                )}

                {!comments.length
                  ? (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  )
                  : (
                    <p className="title is-4">Comments:</p>
                  )}

                {comments.map(comment => (
                  <CommentItem comment={comment} key={comment.id} />
                ))}
              </div>
            )}

          {!showForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShowForm(!showForm)}
            >
              Write a comment
            </button>
          )}
        </div>

        {showForm && (<NewCommentForm />)}

      </div>
    </div>
  );
};
