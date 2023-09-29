import React, { useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentsContext } from '../CommentsContext';
import { PostContext } from '../PostContext';

export const PostDetails: React.FC = () => {
  const {
    comments,
    isCommentLoading,
    isCommentLoadError,
    isCommentDeleteError,
    isFormShown,
    setIsFormShown,
    hadnleCommentDelete,
  } = useContext(CommentsContext);

  const { selectedPost } = useContext(PostContext);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {selectedPost && `#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost && selectedPost.body}
          </p>
        </div>

        <div className="block">
          {isCommentLoading ? (
            <Loader />
          ) : (
            <>
              {(isCommentLoadError || isCommentDeleteError) && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {!comments.length && !isCommentLoadError && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {!!comments.length && !isCommentLoadError && (
                <>
                  <p className="title is-4">Comments:</p>

                  {comments.map(comment => {
                    const { id, name, body } = comment;

                    return (
                      <>
                        <article
                          className="message is-small"
                          data-cy="Comment"
                          key={id}
                        >
                          <div className="message-header">
                            <a
                              href="mailto:misha@mate.academy"
                              data-cy="CommentAuthor"
                            >
                              {name}
                            </a>
                            <button
                              data-cy="CommentDelete"
                              type="button"
                              className="delete is-small"
                              aria-label="delete"
                              onClick={() => hadnleCommentDelete(id)}
                            >
                              delete button
                            </button>
                          </div>

                          <div className="message-body" data-cy="CommentBody">
                            {body}
                          </div>
                        </article>

                      </>
                    );
                  })}
                </>
              )}

              {!isCommentLoadError && !isFormShown && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsFormShown(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {isFormShown && !isCommentLoadError && <NewCommentForm />}
      </div>
    </div>
  );
};
