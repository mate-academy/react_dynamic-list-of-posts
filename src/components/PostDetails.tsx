import React, { useContext, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { GlobalContext } from '../GlobalContetxt';
import * as commentsService from '../api/comments';

export const PostDetails: React.FC = () => {
  const {
    posts,
    postId,
    comments,
    isErrorComments,
    isLoadingComments,
    setIsErrorComments,
    setComments,
  } = useContext(GlobalContext);

  const [createComment, setCreateComment] = useState(false);

  const currentPost = posts.find(post => post.id === postId);

  const handleDeleteComment = (id: number) => {
    commentsService.deletComment(id)
      .then(() => {
        const updatedComments = comments.filter(c => c.id !== id);

        setComments(updatedComments);
      })
      .catch(() => {
        setIsErrorComments(true);
        setComments([]);
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${currentPost?.id}: ${currentPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {currentPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoadingComments && (
            <Loader />
          )}

          {isErrorComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !isErrorComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && !isErrorComments && (
            <p className="title is-4">Comments:</p>
          )}

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
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          {!createComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setCreateComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {createComment && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
