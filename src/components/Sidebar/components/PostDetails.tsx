/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Loader } from '../../Loader';
import { NewCommentForm } from './CommentsList/components/Form/Form';
import { Post } from '../../../types/Post';
import { ErrorText } from '../../../types/ErrorText';
import { getComments } from '../../../api/comments';
import { CommentsError } from './ComError/CommentsError';
import { CommentsList } from './CommentsList/CommentsList';
import { postsContext } from '../../../Store';
type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = React.memo(({ post }) => {
  const [error, setError] = useState<'' | ErrorText>('');
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState(false);
  const { state, setters } = useContext(postsContext);
  const { comments } = state;
  const { setComments } = setters;
  const displayButton = error !== ErrorText.failLoad && !newComment && !loading;
  const displayForm = newComment && !loading;

  const handleError = useCallback((v: ErrorText) => {
    setError(v);
  }, []);

  useEffect(() => {
    setError('');
    setLoading(true);
    setNewComment(false);
    getComments(post.id)
      .then(newComments => {
        setComments(newComments);

        if (newComments.length === 0) {
          setError(ErrorText.noComments);
        }
      })
      .catch(() => {
        setError(ErrorText.failLoad);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (error === ErrorText.noComments || !error) {
      setError('');
      if (comments.length === 0) {
        setError(ErrorText.noComments);
      }
    }
  }, [comments, error]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {loading ? (
            <Loader />
          ) : error ? (
            <CommentsError errorText={error} />
          ) : (
            <CommentsList comments={comments} onError={handleError} />
          )}
        </div>

        {displayButton && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setNewComment(true)}
          >
            Write a comment
          </button>
        )}

        {displayForm && <NewCommentForm onError={handleError} />}
      </div>
    </div>
  );
});

PostDetails.displayName = 'PostDetails';
