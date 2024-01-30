import React, { useContext, useEffect, useState } from 'react';
import './PostDetails.scss';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { CommentsList } from '../CommentsList';
import { StateContext } from '../../store/store';
import { Comment } from '../../types/Comment';
import { getComments } from '../../api/api';

export const PostDetails: React.FC = React.memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const { selectedPost } = useContext(StateContext);

  useEffect(() => {
    if (selectedPost) {
      setShowForm(false);
      setIsLoading(true);

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
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoading
            ? (<Loader />)
            : (
              <CommentsList
                comments={comments}
                setComments={setComments}
                setIsLoading={setIsLoading}
                setShowForm={setShowForm}
                setErrorMessage={setErrorMessage}
                errorMessage={errorMessage}
              />
            )}

          {!showForm && !isLoading && !errorMessage && (
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

        {showForm && !errorMessage && (
          <NewCommentForm
            setComments={setComments}
            setErrorMessage={setErrorMessage}
          />
        )}

      </div>
    </div>
  );
});
