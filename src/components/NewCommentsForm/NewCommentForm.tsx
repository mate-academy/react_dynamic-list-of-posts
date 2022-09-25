import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { addComment } from '../../utils/fetch_Comments';

type Props = {
  selectedPost: Post | null,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  setComments,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [isCommentAdded, setIsCommentAdded] = useState(true);
  const [additionError, setAdditionError] = useState('');

  const errorAuthorName = isFormSubmit && !authorName;
  const errorAuthorEmail = isFormSubmit && !authorEmail;
  const errorCommentText = isFormSubmit && !commentText;

  const addNewComment = (newComment: Comment) => {
    addComment(newComment)
      .then(comments => {
        setIsCommentAdded(true);

        if (!comments.id) {
          setAdditionError('Unable to add a comment');

          return;
        }

        setComments((prevComments) => (
          [...prevComments, comments]
        ));
      })
      .catch(() => setAdditionError('Something went wrong!'));
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmit(true);
    const allRight = authorName && authorEmail && commentText;

    if (allRight && selectedPost) {
      const newComment = {
        postId: selectedPost.id,
        name: authorName,
        email: authorEmail,
        body: commentText,
      };

      addNewComment(newComment);
      setIsCommentAdded(false);
      setCommentText('');
      setIsFormSubmit(false);
    }
  };

  const handleResetBtnClick = () => {
    setAuthorName('');
    setAuthorEmail('');
    setCommentText('');
    setIsFormSubmit(false);
  };

  return (
    <>
      {additionError
        && (
          <div className="notification is-danger">
            {additionError}
          </div>
        )}

      <form
        data-cy="NewCommentForm"
        onSubmit={(e) => handleOnSubmit(e)}
      >
        <div className="field" data-cy="NameField">
          <label className="label" htmlFor="comment-author-name">
            Author Name
          </label>

          <div className="control has-icons-left has-icons-right">
            <input
              type="text"
              name="name"
              id="comment-author-name"
              value={authorName}
              placeholder="Name Surname"
              className={classNames(
                'input',
                { 'is-danger': errorAuthorName },
              )}
              onChange={(e) => setAuthorName(e.currentTarget.value)}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {errorAuthorName
              && (
                <span
                  className="icon is-small is-right has-text-danger"
                  data-cy="ErrorIcon"
                >
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )}
          </div>

          {errorAuthorName
          && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Name is required
            </p>
          )}
        </div>

        <div className="field" data-cy="EmailField">
          <label className="label" htmlFor="comment-author-email">
            Author Email
          </label>

          <div className="control has-icons-left has-icons-right">
            <input
              type="text"
              name="email"
              id="comment-author-email"
              value={authorEmail}
              placeholder="email@test.com"
              className={classNames(
                'input',
                { 'is-danger': errorAuthorEmail },
              )}
              onChange={(e) => setAuthorEmail(e.currentTarget.value)}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {errorAuthorEmail
              && (
                <span
                  className="icon is-small is-right has-text-danger"
                  data-cy="ErrorIcon"
                >
                  <i className="fas fa-exclamation-triangle" />
                </span>
              ) }
          </div>

          {errorAuthorEmail
            && (
              <p className="help is-danger" data-cy="ErrorMessage">
                Email is required
              </p>
            )}
        </div>

        <div className="field" data-cy="BodyField">
          <label className="label" htmlFor="comment-body">
            Comment Text
          </label>

          <div className="control">
            <textarea
              id="comment-body"
              name="body"
              placeholder="Type comment here"
              value={commentText}
              className={classNames(
                'textarea',
                { 'is-danger': errorCommentText },
              )}
              onChange={(e) => setCommentText(e.currentTarget.value)}
            />
          </div>

          {errorCommentText
            && (
              <p className="help is-danger" data-cy="ErrorMessage">
                Enter some text
              </p>
            )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={classNames(
                'button is-link',
                { 'is-loading': !isCommentAdded },
              )}
            >
              Add
            </button>
          </div>

          <div className="control">
            {/* eslint-disable-next-line react/button-has-type */}
            <button
              type="reset"
              className="button is-link is-light"
              onClick={handleResetBtnClick}
            >
              Clear
            </button>
          </div>
        </div>

      </form>
    </>
  );
};
