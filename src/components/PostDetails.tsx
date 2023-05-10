/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { Errors } from '../types/Errors';

import { getComments, postComment, deleteComment } from '../api/users';

type Props = {
  post: Post | null;
  isFormShown: boolean;
  typeOfError: Errors;
  setTypeOfError: (data: Errors) => void;
  showForm: () => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  isFormShown,
  showForm,
  typeOfError,
  setTypeOfError,
}) => {
  const [commentsList, setCommentsList] = useState<Comment[] | null>(null);
  const [areCommentsLoading, setCommentsLoading] = useState(false);
  const [isCommentAdding, setCommentAdding] = useState(false);
  const [
    removingCommentsId, setRemovingCommentsId,
  ] = useState<number | null>(null);
  const [newCommentsData, setNewCommentsData] = useState<CommentData>(
    {
      postId: post?.id || null,
      name: '',
      email: '',
      body: '',
    },
  );

  async function loadComments() {
    setTypeOfError(Errors.None);
    try {
      setCommentsLoading(true);
      const commentsFromServer = await getComments(post?.id);

      setCommentsList(commentsFromServer);
    } catch (error) {
      setTypeOfError(Errors.Comments);
    } finally {
      setCommentsLoading(false);
    }
  }

  const addComment = async () => {
    setCommentAdding(false);
    setTypeOfError(Errors.None);

    try {
      setCommentAdding(true);

      const comment = await postComment(newCommentsData);

      setCommentsList(currComments => {
        if (currComments) {
          return [...currComments, comment];
        }

        return [comment];
      });
    } catch (error) {
      setTypeOfError(Errors.Adding);
    } finally {
      setCommentAdding(false);
    }
  };

  const removeComment = async (id: number) => {
    setTypeOfError(Errors.None);
    setRemovingCommentsId(null);
    try {
      await deleteComment(id);

      setCommentsList(comments => {
        return comments?.filter(comment => comment.id !== id) || null;
      });
    } catch (error) {
      setTypeOfError(Errors.Deleting);
      setRemovingCommentsId(id);
    }
  };

  useEffect(() => {
    loadComments();
    setNewCommentsData(
      {
        postId: post?.id || null,
        name: '',
        email: '',
        body: '',
      },
    );
  }, [post?.id]);

  useEffect(() => {
    let timer = 0;

    if (typeOfError === Errors.Adding || typeOfError === Errors.Deleting) {
      timer = window.setTimeout(() => {
        setTypeOfError(Errors.None);
        setRemovingCommentsId(null);
      }, 3000);
    }

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [typeOfError, setTypeOfError, setRemovingCommentsId]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post?.id}: {post?.title}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {areCommentsLoading && <Loader />}

          {typeOfError === Errors.Comments && (
            <div className="notification is-danger" data-cy="CommentsError">
              {typeOfError[0].toUpperCase()
              + typeOfError.slice(1).toLowerCase()}
            </div>
          )}

          {commentsList?.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!commentsList && commentsList?.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {commentsList?.map(comment => (
                <React.Fragment key={comment.id}>
                  <article
                    className="message is-small"
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

                  {typeOfError === Errors.Deleting
                  && removingCommentsId === comment.id && (
                    <p className="help is-danger" data-cy="ErrorMessage">
                      {typeOfError[0].toUpperCase()
                      + typeOfError.slice(1).toLowerCase()}
                    </p>
                  )}
                </React.Fragment>
              ))}
            </>
          )}

          {!isFormShown && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={showForm}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormShown && (
          <NewCommentForm
            newCommentsData={newCommentsData}
            setNewCommentsData={setNewCommentsData}
            addComment={addComment}
            isCommentAdding={isCommentAdding}
            typeOfError={typeOfError}
          />
        )}
      </div>
    </div>
  );
};
