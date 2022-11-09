import React, { useContext } from 'react';
import classNames from 'classnames';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';

import { Context } from './Context';

import { deleteComments } from '../api/api';

type Props = {
  selectedPost: Post
  openForm: boolean
  setOpenForm: (x: boolean) => void
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  openForm,
  setOpenForm,
}) => {
  const { id, title, body } = selectedPost;
  const {
    commentList,
    setCommentList,
    commentListError,
    setCommentListError,
  } = useContext(Context);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {(!commentList && <Loader />)
          || ((!commentListError && (
            <>
              {(commentList && commentList.length > 0)
                ? (
                  <>
                    <p className="title is-4">Comments:</p>
                    {
                      commentList?.map(comment => {
                        const { name, email } = comment;

                        return (
                          <article
                            className="message is-small"
                            data-cy="Comment"
                            key={comment.id}
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
                                onClick={() => {
                                  deleteComments(comment.id)
                                    .then(() => {
                                      setCommentList([
                                        ...commentList.filter(commentItem => {
                                          if (commentItem.id === comment.id) {
                                            return false;
                                          }

                                          return true;
                                        }),
                                      ]);
                                    })
                                    .catch(() => {
                                      setCommentListError(true);
                                    });
                                }}
                              >
                                delete button
                              </button>
                            </div>
                            <div className="message-body" data-cy="CommentBody">
                              {comment.body}
                            </div>
                          </article>
                        );
                      })
                    }
                  </>
                )
                : (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )}

              <button
                data-cy="WriteCommentButton"
                type="button"
                className={classNames(
                  'button',
                  'is-link',
                  { 'is-hidden': openForm },
                )}
                onClick={() => {
                  setOpenForm(true);
                }}
              >
                Write a comment
              </button>
            </>
          )) || (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          ))}
        </div>

        {openForm && (
          <NewCommentForm
            selectedPost={selectedPost}
          />
        )}
      </div>
    </div>
  );
};
