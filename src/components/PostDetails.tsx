import { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PostsContext } from '../context/PostsContext';
import { deleteCommentById, getCommentsById } from '../api/comments';
import { NewCommentForm } from './NewCommentForm';
import { CommentsContext } from '../context/CommentsContext';

export const PostDetails: React.FC = () => {
  const { post } = useContext(PostsContext);
  const { comments, setComments } = useContext(CommentsContext);

  const [hasCommentsError, setHasCommentsError] = useState(false);
  const [isLoasding, setIsLoading] = useState(false);
  const [isWriteCommentExist, setIsWriteCommentExist] = useState(false);

  const handleDeleteComment = (commentId: number) => {
    deleteCommentById(commentId)
      .then(() => {
        setComments(prevComments => {
          return prevComments.filter(({ id }) => id !== commentId);
        });
      });
  };

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

          {comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && <p className="title is-4">Comments:</p>}
          {comments.map(currentComment => {
            const {
              id, email, name, body,
            } = currentComment;

            return (
              <article className="message is-small" data-cy="Comment" key={id}>
                <div className="message-header">
                  <a href={`mailto:${email}`} data-cy="CommentAuthor">
                    {name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {body}
                </div>
              </article>
            );
          })}

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
