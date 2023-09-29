import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { usePosts } from '../context/PostsContext';
import { getCommentsById } from '../api/comments';
import { NewCommentForm } from './NewCommentForm';
import { useComments } from '../context/CommentsContext';
import { CurrentComment } from './CurrentComment';

export const PostDetails: React.FC = () => {
  const { post } = usePosts();
  const { comments, setComments } = useComments();

  const [hasCommentsError, setHasCommentsError] = useState(false);
  const [isLoasding, setIsLoading] = useState(false);
  const [isWriteCommentExist, setIsWriteCommentExist] = useState(false);

  useEffect(() => {
    if (post) {
      setIsLoading(true);
      getCommentsById(post.id)
        .then(setComments)
        .catch(() => setHasCommentsError(true))
        .finally(() => setIsLoading(false));

      setIsWriteCommentExist(false);
    }
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {isLoasding && <Loader />}

          {hasCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && <p className="title is-4">Comments:</p>}
          {comments.map(currentComment => (
            <CurrentComment
              currentComment={currentComment}
              key={currentComment.id}
            />
          ))}

          {!isWriteCommentExist && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWriteCommentExist(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWriteCommentExist && <NewCommentForm />}
      </div>
    </div>
  );
};
