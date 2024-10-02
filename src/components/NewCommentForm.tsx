import React, { useCallback, useMemo, useState } from 'react';
import { Comment } from '../types/Comment';
import classNames from 'classnames';
import { client } from '../utils/fetchClient';

type Props = {
  onSubmit: (newComment: Comment) => void;
  postId: number;
  comments: Comment[];
};

export const NewCommentForm: React.FC<Props> = ({
  onSubmit,
  postId,
  comments,
}) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [addError, setAddError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      callback: React.Dispatch<React.SetStateAction<string>>,
    ) => {
      callback(e.target.value);
      switch (callback) {
        case setName:
          setNameError(false);
          break;
        case setEmail:
          setEmailError(false);
          break;
        case setBody:
          setBodyError(false);
          break;
        default:
          break;
      }
    },
    [],
  );
  const nextId = useMemo(() => {
    let maxId = 0;

    comments.forEach(comment => {
      if (comment.id > maxId) {
        maxId = comment.id;
      }
    });

    return maxId + 1;
  }, [comments]);

  const handleAddComment = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (!name) {
        setNameError(true);
      }

      if (!email) {
        setEmailError(true);
      }

      if (!body.trim()) {
        setBodyError(true);
      }

      if (name && email && body.trim()) {
        setIsSubmiting(true);

        const newComment = {
          id: nextId,
          postId,
          name,
          email,
          body,
        };

        client
          .post<Comment>('/comments', newComment)
          .then(res => {
            onSubmit(res);
            setBody('');
          })
          .catch(() => setAddError(true))
          .finally(() => setIsSubmiting(false));
      }
    },
    [name, email, body, postId, comments, onSubmit],
  );

  return (
    <form data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': nameError })}
            value={name}
            onChange={e => handleChange(e, setName)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': emailError })}
            value={email}
            onChange={e => handleChange(e, setEmail)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
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
            className={classNames('textarea', { 'is-danger': bodyError })}
            value={body}
            onChange={e => handleChange(e, setBody)}
          />
        </div>

        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>
      {addError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong. Can &apos;t add that comment.
        </div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isSubmiting,
            })}
            onClick={handleAddComment}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => {
              setName('');
              setEmail('');
              setBody('');
              setNameError(false);
              setEmailError(false);
              setBodyError(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
