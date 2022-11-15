import React from 'react';
import classNames from 'classnames';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
  comments: Comment[];
  loadingComments: boolean;
  commentsLoadingError: boolean;
  formIsVisible: boolean;
  showForm: () => void;
  createComment: (name: string, email: string, commentText: string) => void;
  loadingNewComment: boolean,
  removeComment: (commentId: number) => void;
  deletingCommentsID: number[];
};

export const PostDetails: React.FC<Props> = (
  {
    post,
    comments,
    loadingComments,
    commentsLoadingError,
    formIsVisible,
    showForm,
    createComment,
    loadingNewComment,
    removeComment,
    deletingCommentsID,
  },
) => {
  const { title, body } = post;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {title}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {loadingComments ? (
            <Loader />
          ) : (
            <>
              {commentsLoadingError ? (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              ) : (
                <>
                  {!comments.length ? (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  ) : (
                    <>
                      <p className="title is-4">Comments:</p>
                      {comments.map(comment => (
                        <article
                          key={comment.id}
                          className={classNames(
                            'message is-small',
                            {
                              'is-deleting':
                                deletingCommentsID.includes(comment.id),
                            },
                          )}
                          data-cy="Comment"
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
                              onClick={() => removeComment(comment.id)}
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
                  {formIsVisible ? (
                    <NewCommentForm
                      createComment={createComment}
                      loadingNewComment={loadingNewComment}
                    />
                  ) : (
                    <button
                      data-cy="WriteCommentButton"
                      type="button"
                      className="button is-link"
                      onClick={showForm}
                    >
                      Write a comment
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
