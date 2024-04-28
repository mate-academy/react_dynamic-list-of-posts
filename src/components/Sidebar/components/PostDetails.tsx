import React, { useEffect, useState } from 'react';
import { Loader } from '../../Loader';
import { Post } from '../../../types/Post';
import { ErrorText } from '../../../types/ErrorText';
import { getComments } from '../../../api/comments';
import { CommentsError } from './ComError/CommentsError';
import { CommentsList } from './CommentsList/CommentsList';
import { Comment } from '../../../types/Comment';
import { ComntContext } from '../../../context/ComntComtext';
type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = React.memo(({ post }) => {
  const [error, setError] = useState<'' | ErrorText>('');
  const [loading, setLoading] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const displayList = (error !== ErrorText.failLoad || !error) && !loading;
  const comntContext = { comments, setComments };

  useEffect(() => {
    setError('');
    setLoading(true);
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
  }, [post]);

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
      <ComntContext.Provider value={comntContext}>
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

            <p data-cy="PostBody">{post.body}</p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              {error && <CommentsError errorText={error} />}
              {displayList && <CommentsList comments={comments} />}
            </>
          )}
        </div>
      </ComntContext.Provider>
    </div>
  );
});

PostDetails.displayName = 'PostDetails';
