/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import { Comment } from '../../types/Comment';

import { addComment } from '../../api/comments';

import { emailValidator } from '../../functions/emailValidator';

import './NewCommentForm.scss';

type Props = {
  getComments: () => Promise<void>;
  postId: number;
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  getComments,
  postId,
}) => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputComment, setInputComment] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);
  const [isSubmited, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitted(true);

      if (!inputName || !inputEmail || !inputComment) {
        return;
      }

      if (!emailValidator(inputEmail)) {
        setEmailValid(false);

        return;
      }

      const newComment: Omit<Comment, 'id'> = {
        postId,
        name: inputName,
        email: inputEmail,
        body: inputComment,
      };

      await addComment(newComment);
      await getComments();

      setSubmitted(false);
      setInputName('');
      setInputEmail('');
      setInputComment('');
    },
    [inputName, inputEmail, inputComment, postId],
  );

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={inputName}
          onChange={({ target }) => {
            setInputName(target.value);
          }}
        />
      </div>

      <div className="form-field">
        {!isEmailValid && (
          <p className="NewCommentForm__emailError">
            Email is invalid
          </p>
        )}

        <input
          type="text"
          name="email"
          placeholder="Your email"
          className={classNames(
            'NewCommentForm__input',
            { 'NewCommentForm__input--invalid': !isEmailValid },
          )}
          value={inputEmail}
          onChange={({ target }) => {
            if (isSubmited) {
              if (inputEmail !== target.value) {
                setEmailValid(true);
              }
            }

            setInputEmail(target.value);
          }}
          onBlur={({ target }) => {
            if (isSubmited) {
              setEmailValid(emailValidator(target.value));
            }
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={inputComment}
          onChange={({ target }) => {
            setInputComment(target.value);
          }}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
});
