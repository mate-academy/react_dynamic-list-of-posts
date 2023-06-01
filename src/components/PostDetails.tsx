import React, { useEffect, useState } from 'react';

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
  const [comments, setComments] = useState<Comment[]>([]);
  const [isOpenForm, setOpenForm] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const fetchingComments = async (id: number) => {
    setLoading(true);
    setComments([]);

    try {
      const response = await getComments(id);

      setComments(response);
    } catch (error) {
      setLoading(false);
      setOpenForm(false);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const removeComment = async (id: number) => {
    try {
      await deleteComment(id);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    if (postDetail) {
      fetchingComments(postDetail.id);
    }

    setOpenForm(false);
  }, [postDetail]);

  const onClickHandle = () => {
    setOpenForm(true);
  };

  const onClickHandleRemove = (id: number) => {
    removeComment(id);

    setComments(currComments => currComments
      .filter(comment => comment.id !== id));
  };

  const onClickHandleAdd = (comment: Comment) => {
    setComments(currComments => ([...currComments, comment]));
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
              {isError && (
                <div
                  className="notification is-danger"
                  data-cy="CommentsError"
                >
                  Something went wrong
                </div>
              )}

              {isLoading
                ? <Loader />
                : (
                  <>
                    {!comments.length && !isError && (
                      <p
                        className="title is-4"
                        data-cy="NoCommentsMessage"
                      >
                        No comments yet
                      </p>
                    )}

                    {!!comments.length && !isError && (
                      <>
                        <p className="title is-4">Comments:</p>

                        {comments.map(({
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

                    {!isOpenForm && !isError && (
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

            {isOpenForm && (
              <NewCommentForm
                postId={postDetail?.id || 0}
                commentsLength={comments.length}
                onClickHandleAdd={onClickHandleAdd}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
