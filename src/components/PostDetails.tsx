import React, { useEffect } from 'react';

import { useAction, useValues } from '../customState';

import { getComments, deleteComment } from '../api/api';

import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  postDetail: Post | null;
};

export const PostDetails: React.FC<Props> = ({
  postDetail,
}) => {
  const comments = useValues<Comment[]>([]);
  const isOpenForm = useAction(false);
  const loading = useAction(true);
  const errors = useAction(false);

  const fetchingComments = async (id: number) => {
    loading.changeAction(true);
    comments.changeValue([]);

    try {
      const response = await getComments(id);

      comments.changeValue(response);
    } catch (error) {
      loading.changeAction(false);
      isOpenForm.changeAction(false);
      errors.changeAction(true);
    } finally {
      loading.changeAction(false);
    }
  };

  const removeComment = async (id: number) => {
    try {
      await deleteComment(id);
    } catch (error) {
      errors.changeAction(true);
    }
  };

  useEffect(() => {
    if (postDetail) {
      fetchingComments(postDetail.id);
    }

    isOpenForm.changeAction(false);
  }, [postDetail]);

  const onClickHandle = () => {
    isOpenForm.changeAction(true);
  };

  const onClickHandleRemove = (id: number) => {
    removeComment(id);

    comments.changeValue(comments.currValue
      .filter(comment => comment.id !== id));
  };

  const onClickHandleAdd = (comment: Comment) => {
    comments.changeValue([...comments.currValue, comment]);
  };

  return (
    <>
      {postDetail && (
        <div className="content" data-cy="PostDetails">
          <div className="content" data-cy="PostDetails">
            <div className="block">
              <h2 data-cy="PostTitle">
                {`#${postDetail?.id}: ${postDetail?.title}`}
              </h2>

              <p data-cy="PostBody">
                {postDetail?.body}
              </p>
            </div>

            <div className="block">
              {errors.currAction && (
                <div
                  className="notification is-danger"
                  data-cy="CommentsError"
                >
                  Something went wrong
                </div>
              )}

              {loading.currAction
                ? <Loader />
                : (
                  <>
                    {!comments.currValue.length && !errors.currAction && (
                      <p
                        className="title is-4"
                        data-cy="NoCommentsMessage"
                      >
                        No comments yet
                      </p>
                    )}

                    {!!comments.currValue.length && !errors.currAction && (
                      <>
                        <p className="title is-4">Comments:</p>

                        {comments.currValue.map(({
                          id,
                          name,
                          email,
                          body,
                        }) => (
                          <article
                            key={id}
                            className="message is-small"
                            data-cy="Comment"
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
                                onClick={() => onClickHandleRemove(id)}
                              >
                                delete button
                              </button>
                            </div>

                            <div
                              className="message-body"
                              data-cy="CommentBody"
                            >
                              {body}
                            </div>
                          </article>
                        ))}
                      </>
                    )}

                    {!isOpenForm.currAction && !errors.currAction && (
                      <button
                        data-cy="WriteCommentButton"
                        type="button"
                        className="button is-link"
                        onClick={onClickHandle}
                      >
                        Write a comment
                      </button>
                    )}
                  </>
                )}
            </div>

            {isOpenForm.currAction && (
              <NewCommentForm
                postId={postDetail?.id || 0}
                commentsLength={comments.currValue.length}
                onClickHandleAdd={onClickHandleAdd}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
