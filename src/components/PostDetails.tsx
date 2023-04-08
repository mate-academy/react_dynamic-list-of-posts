import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  openedPost: Post;
  postComments: Comment[];
  isCommentLoading: boolean,
  isCommentLoadingError: boolean,
  isNoComments: boolean,
  setIsNewCommentForm: (newCommentForm: boolean) => void,
  isNewCommentForm: boolean,
  addComment: (
    newComment: CommentData,
    offButtonLoad: (status: boolean) => void,
    clearText: () => void,
  ) => void,
  commentDelete: (commentId: number, setDeleteId: () => void) => void,
};

export const PostDetails: React.FC<Props> = ({
  openedPost,
  postComments,
  isCommentLoading,
  isCommentLoadingError,
  isNoComments,
  setIsNewCommentForm,
  isNewCommentForm,
  addComment,
  commentDelete,
}) => {
  const [commentDeleteId, setCommentDeleteId] = useState(0);

  const setDeleteId = () => {
    setCommentDeleteId(0);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${openedPost.id}: ${openedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {openedPost.body}
          </p>
        </div>

        <div className="block">
          {!isCommentLoadingError && isCommentLoading && <Loader />}

          {isCommentLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {!isCommentLoadingError && isNoComments
          && postComments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isCommentLoadingError && postComments.length !== 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {postComments.map((comment) => {
                const {
                  id,
                  name,
                  email,
                  body,
                } = comment;

                if (commentDeleteId === id) {
                  return null;
                }

                return (
                  <article
                    key={id}
                    className="message is-small is-loading"
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
                        onClick={() => {
                          commentDelete(id, setDeleteId);
                          setCommentDeleteId(id);
                        }}
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

          {!isCommentLoadingError && !isNewCommentForm && !isCommentLoading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsNewCommentForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {!isCommentLoadingError && isNewCommentForm
        && (
          <NewCommentForm
            addComment={addComment}
          />
        )}
      </div>
    </div>
  );
};
