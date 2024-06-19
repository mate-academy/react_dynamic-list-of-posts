/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import * as serviceData from '../api/serviceData';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { title, id, body } = post as Post;
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasForm, setHasForm] = useState(false);

  const deleteComment = (id: number) => {
    const prevComments = comments;

    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== id),
    );

    serviceData
      .deleteCommentsByPostId(id)
      .then(() => {})
      .catch(() => {
        setComments(prevComments);
        setErrorMessage('Unable delete comment');
      });
  };

  const handleForm = () => {
    setHasForm(true);
  };

  const addComment = (newComment: Comment) => {
    setComments(currentComments => [...currentComments, newComment]);
  };

  useEffect(() => {
    setIsLoading(true);
    setHasForm(false);

    serviceData
      .getCommentsByPostId(id)
      .then(setComments)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

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

          {errorMessage && comments.length < 1 && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {comments.length < 1 && !isLoading && !errorMessage && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && !isLoading && (
            <p className="title is-4">Comments:</p>
          )}

          {!isLoading &&
            comments.map(comment => {
              const { id, body, name, email } = comment;

              return (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={id}
                >
                  <div className="message-header">
                    <a href={`mailto:${email}`} data-cy="CommentAuthor">
                      {name}
                    </a>

                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => deleteComment(id)}
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

          {!hasForm && !isLoading && !errorMessage && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleForm}
            >
              Write a comment
            </button>
          )}
        </div>

        {hasForm && (
          <NewCommentForm
            postId={id}
            addComment={addComment}
            setError={setErrorMessage}
          />
        )}
      </div>
    </div>
  );
};
