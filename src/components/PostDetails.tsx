import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { getComments } from '../services/comment';
import { CommentData } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormShown, setIsFormShown] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getComments(post.id)
      .then(setComments)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [post]);

  const handleWriteComment = () => {
    setIsFormShown(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {
              post.body
            }
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(!comments.length && !isLoading) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(comments.length > 0 && !isLoading) && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article className="message is-small" data-cy="Comment">
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {(!isLoading && !isFormShown) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleWriteComment}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormShown && <NewCommentForm />}
      </div>
    </div>
  );
};
