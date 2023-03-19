import React, { useEffect } from 'react';
import { deleteComment } from '../api/coment';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  isLoadingSidebar: boolean,
  comments: Comment[],
  isErrorSide: boolean,
  openedPost: Post | null,
  setIsErrorSide: (arg: boolean) => void,
  setComments: (arg: Comment[]) => void,
  isVisibleForm: boolean,
  setIsVisibleForm: (arg: boolean) => void,
};

export const PostDetails: React.FC<Props> = ({
  isLoadingSidebar,
  comments,
  isErrorSide,
  openedPost,
  setIsErrorSide,
  setComments,
  isVisibleForm,
  setIsVisibleForm,
}) => {
  const handleCommentDelete = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        setComments(comments.filter((element) => element.id !== commentId));
      })
      .catch(() => setIsErrorSide(true));
  };

  const handleFormVisiblity = () => setIsVisibleForm(true);

  useEffect(() => {
    setComments([]);
    setIsVisibleForm(false);
  }, [openedPost]);

  return (
    <div
      className="content"
      data-cy="PostDetails"
    >
      <div
        className="content"
        data-cy="PostDetails"
      >
        {openedPost && (
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${openedPost?.id}: ${openedPost?.title}`}
            </h2>

            <p data-cy="PostBody">
              {openedPost?.body}
            </p>
          </div>
        )}

        <div className="block">
          {isLoadingSidebar && (
            <Loader />
          )}
          {isErrorSide && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong
            </div>
          )}
          {!isErrorSide
            && comments.length === 0
            && !isVisibleForm
            && openedPost
            && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}
          {openedPost
            && comments.length > 0
            && (
              <>
                <p className="title is-4">
                  Comments:
                </p>
                {comments.map((item) => (
                  <article
                    key={item.id}
                    className="message is-small"
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${item.email}`}
                        data-cy="CommentAuthor"
                      >
                        {item.name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleCommentDelete(item.id)}
                      >
                        Delete comment
                      </button>
                    </div>

                    <div
                      className="message-body"
                      data-cy="CommentBody"
                    >
                      {item.body}
                    </div>
                  </article>
                ))}
              </>
            )}
          {!isErrorSide
            && openedPost
            && !isVisibleForm
            && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={handleFormVisiblity}
              >
                Write a comment
              </button>
            )}
        </div>
        {isVisibleForm && (
          <NewCommentForm
            openedPost={openedPost}
            comments={comments}
            setComments={setComments}
            setIsErrorSide={setIsErrorSide}
          />
        )}
      </div>
    </div>
  );
};
