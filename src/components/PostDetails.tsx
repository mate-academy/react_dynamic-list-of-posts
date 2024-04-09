import React, { useState } from 'react';
import { useGlobalContext } from '../lib/GlobalContext';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as servicesComments from '../api/comments';

export const PostDetails: React.FC = () => {
  const {
    setIsFormOpen,
    isFormOpen,
    hasErrorMessage,
    setComments,
    selectPost: post,
    isCommentLoading,
    comments,
  } = useGlobalContext();

  const [hasErrorCreateComment, setHasErrorCreateComment] = useState(false);

  const hasComments = !!comments?.length && !isCommentLoading;

  const handleDeleteComment = async (id: number) => {
    try {
      await servicesComments.deleteComment(id);

      setComments(prevState => prevState.filter(comment => comment.id !== id));
    } finally {
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {isCommentLoading && <Loader />}

        {hasErrorCreateComment ||
          (hasErrorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          ))}

        {!isCommentLoading && !hasErrorMessage && (
          <>
            {!hasComments && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {hasComments && (
              <>
                <p className="title is-4">Comments:</p>

                {comments?.map(comment => {
                  const { id, name, email, body } = comment;

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
              </>
            )}

            {isFormOpen ? (
              <NewCommentForm
                setHasErrorCreateComment={setHasErrorCreateComment}
              />
            ) : (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => {
                  setIsFormOpen(true);
                  setHasErrorCreateComment(false);
                }}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
