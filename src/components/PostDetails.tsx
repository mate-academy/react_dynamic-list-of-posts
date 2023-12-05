import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post | null,
};

export const PostDetails: React.FC<Props> = (
  {
    post,
  },
) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNewComment, setIsNewComment] = useState(false);

  useEffect(() => {
    if (post) {
      setIsLoading(true);
      client.get<Comment[]>(`/comments?postId=${post?.id}`)
        .then((data) => setComments(data))
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }

    setIsNewComment(false);
  }, [post]);

  const handleWriteComment = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setIsNewComment(true);
  };

  const handleDeleteComment = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    comment: Comment,
  ) => {
    event.preventDefault();
    client.delete(`/comments/${comment.id}`)
      .then(() => {
        setComments(
          prevComments => prevComments.filter(c => c.id !== comment.id),
        );
      })
      .catch(() => setIsError(true));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {`${post?.body}`}
          </p>
        </div>

        <div className="block">
          {isLoading && (<Loader />)}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isError && (comments.length === 0 ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <p className="title is-4">Comments:</p>
          ))}

          {comments.map((comment) => {
            return (
              <article
                className="message is-small"
                data-cy="Comment"
                key={comment.id}
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {`${comment.name}`}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={event => handleDeleteComment(event, comment)}
                  >
                    delete button
                  </button>
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {`${comment.body}`}
                </div>
              </article>
            );
          })}

          {!isNewComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={event => handleWriteComment(event)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isNewComment && (<NewCommentForm />)}
      </div>
    </div>
  );
};
