import React from 'react';
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
  const hanbleCommentDelete = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        setComments(comments.filter((element) => element.id !== commentId));
      })
      .catch(() => setIsErrorSide(true));
  };

  const hanleFormVisible = () => setIsVisibleForm(true);

  return (
    <div
      className="content"
      data-cy="PostDetails"
    >
      <div
        className="content"
        data-cy="PostDetails"
      >
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${openedPost?.id}: ${openedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {openedPost?.body}
          </p>
        </div>

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
          {!comments.length && (
            <p
              className="title is-4"
              data-cy="NoCommentsMessage"
            >
              No comments yet
            </p>
          )}
          {comments.length > 0 && (
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
                      href="mailto:misha@mate.academy"
                      data-cy="CommentAuthor"
                    >
                      {item.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => hanbleCommentDelete(item.id)}
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
          {!isVisibleForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={hanleFormVisible}
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
