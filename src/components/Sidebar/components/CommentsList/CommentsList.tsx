import React, { useCallback, useState } from 'react';
import { Comment } from '../../../../types/Comment';
import { CommentItem } from './components/CommentsItem';
import { ErrorText } from '../../../../types/ErrorText';
import { Loader } from '../../../Loader';
import { NewCommentForm } from './components/Form/NewCommentForm';
import { CommentsError } from '../ComError/CommentsError';

type Props = { comments: Comment[] };

export const CommentsList: React.FC<Props> = React.memo(({ comments }) => {
  const [newComment, setNewComment] = useState(true);
  const [error, setError] = useState<'' | ErrorText>('');
  const [loading, setLoading] = useState(false);
  const hasEnoughComments = comments.length > 0;
  const onError = useCallback((v: ErrorText) => {
    setError(v);
  }, []);

  return (
    <>
      <div className="block">
        {hasEnoughComments && (
          <div>
            <p className="title is-4">Comments:</p>
            {comments.map(comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onError={onError}
              />
            ))}
            {loading && <Loader />}
            {!loading && error && <CommentsError errorText={error} />}
          </div>
        )}
      </div>

      {newComment ? (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={() => setNewComment(false)}
        >
          Write a comment
        </button>
      ) : (
        <NewCommentForm
          onError={onError}
          loading={loading}
          updateLoading={setLoading}
        />
      )}
    </>
  );
});

CommentsList.displayName = 'CommentsList';
