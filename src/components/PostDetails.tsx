import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { addComment, deleteComment, getComments } from '../api/posts';

type Props = {
  post: Post,
  visibleForm: boolean,
  setVisibleForm: (f: boolean) => void,
};

export const PostDetails: React.FC<Props> = ({
  post,
  visibleForm,
  setVisibleForm,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCommentSubmiting, setIsCommentSubmiting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getComments(post.id).then(setComments)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [post]);

  const addNewComment = ({
    postId, name, email, body,
  }: Omit<Comment, 'id'>) => {
    setIsCommentSubmiting(true);

    addComment({
      postId, name, email, body,
    })
      .then((c) => {
        setComments(currentComments => [...currentComments, c]);
      })
      .catch(() => {
        setErrorMessage('Unable to add a comment');
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      })
      .finally(() => setIsCommentSubmiting(false));
  };

  const onDelete = (id: number) => {
    setComments(current => current.filter(c => c.id !== id));

    deleteComment(id).then()
      .catch(() => {
        setErrorMessage('Unable to delete a comment');
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && (comments?.length
            ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <p className="title is-4">Comments:</p>
            ))}

           {!isLoading && comments?.map(({
            id, email, name, body,
           }) => (
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
                  onClick={() => onDelete(id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {body}
              </div>
            </article>
          ))}

          {!visibleForm && !isLoading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setVisibleForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {visibleForm && (
          <NewCommentForm
            post={post}
            addNewComment={addNewComment}
            isCommentSubmiting={isCommentSubmiting}
          />
        )}
      </div>

      {errorMessage && (
        <div className="notification is-danger is-light">
          <strong>{errorMessage}</strong>
        </div>
      )}
    </div>
  );
};
