import React, { useContext, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { Context } from './Store';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = React.memo(({ post }) => {
  const { id, title, body } = post;

  const {
    loadingComments,
    message,
    comments,
    setComments,
    openForm,
    setOpenForm,
  } = useContext(Context);

  const [failedDelete, setFailedDelete] = useState('');

  const {
    error: isError,
    openComments: hasComments,
    write: writeAComment,
  } = useMemo(() => {
    const error = message === 'Something went wrong!' && !loadingComments;
    const openComments = comments.length > 0 && !error && !loadingComments;
    const write = !loadingComments && !error && !openForm;

    return { error, openComments, write };
  }, [comments.length, loadingComments, message, openForm]);

  const deleteComment = (commentId: number) => {
    setFailedDelete('');

    client
      .delete(`/comments/${commentId}`)
      .then(() => {
        setComments(current =>
          current.filter(comment => comment.id !== commentId),
        );
      })
      .catch(() => setFailedDelete('Unable to delete a comment'));
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (failedDelete) {
      timerId = setTimeout(() => {
        setFailedDelete('');
      }, 3000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [failedDelete]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {loadingComments && <Loader />}

          {isError ? (
            <div className="notification is-danger" data-cy="CommentsError">
              {message}
            </div>
          ) : (
            <p
              className="title is-4"
              data-cy={!comments.length && 'NoCommentsMessage'}
            >
              {message}
            </p>
          )}

          {hasComments &&
            comments.map(comment => (
              <article
                className="message is-small"
                data-cy="Comment"
                key={comment.id}
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}

          <div
            className={cn('error-delete', {
              'error-delete--open': failedDelete,
            })}
          >
            Unable to delete a comment
          </div>

          {writeAComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setOpenForm(!openForm)}
            >
              Write a comment
            </button>
          )}
        </div>

        <div className={cn('Form', { 'Form--open': openForm })}>
          <NewCommentForm postId={post.id} />
        </div>
      </div>
    </div>
  );
});
