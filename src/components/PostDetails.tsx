import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { getComments } from '../api/getComments';
import { CommentsContext } from '../utils/CommentsContext';

type Props = {
  openedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ openedPost }) => {
  const { id, title, body } = openedPost;
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const { comments, setComments } = useContext(CommentsContext);

  useEffect(() => {
    setIsLoading(true);
    getComments(id)
      .then(result => setComments(result))
      .catch(() => setIsError(true))
      .finally(() => {
        setTimeout(() => setIsLoading(false), 300);
      });
  }, [id, setComments]);

  useEffect(() => setIsCommenting(false), [openedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{id}: {title}
          </h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isError && !isLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !isError && comments.length < 1 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && !isError && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.body}`} data-cy="CommentAuthor">
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
              {!isCommenting && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsCommenting(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {isCommenting && <NewCommentForm />}
      </div>
    </div>
  );
};
