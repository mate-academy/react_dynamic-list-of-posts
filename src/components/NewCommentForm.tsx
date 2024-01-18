import React, { useState } from 'react';
import cn from 'classnames';

import { Comment } from '../types/Comment';
import { addComment } from '../api/comments';

interface Props {
  postId: number,
  addNewComment: (el: Comment) => void,
  changeErrorState: (el: boolean) => void,
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  addNewComment,
  changeErrorState,
}) => {
  const [inputName, setInputName] = useState('');
  const [inputMail, setInputMail] = useState('');
  const [textarea, setTextarea] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleReset = () => {
    setInputName('');
    setInputMail('');
    setTextarea('');
    setSubmitAttempted(false);
  };

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    changeErrorState(false);
    const newComment = {
      id: 0,
      postId,
      name: inputName,
      email: inputMail,
      body: textarea,
    };

    if (inputName.trim() && inputMail.trim() && textarea.trim()) {
      setIsAdding(true);
      addComment('/comments', newComment)
        .then(() => {
          setTextarea('');
          addNewComment(newComment);
          setIsAdding(false);
        })
        .catch(() => changeErrorState(true));
    }

    if (!inputName.trim() || !inputMail.trim() || !textarea.trim()) {
      setSubmitAttempted(true);
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSumbit}>
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
            className={cn(
              'input',
              { 'is-danger': !inputName && submitAttempted },
            )}
            value={inputName}
            onChange={e => setInputName(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!inputName && submitAttempted && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!inputName && submitAttempted && (
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
            className={cn(
              'input',
              { 'is-danger': !inputMail && submitAttempted },
            )}
            value={inputMail}
            onChange={e => setInputMail(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!inputMail && submitAttempted && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!inputMail && submitAttempted && (
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
            className={cn(
              'textarea',
              { 'is-danger': !textarea && submitAttempted },
            )}
            value={textarea}
            onChange={e => setTextarea(e.target.value)}
          />
        </div>

        {!textarea && submitAttempted && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', { 'is-loading': isAdding })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
