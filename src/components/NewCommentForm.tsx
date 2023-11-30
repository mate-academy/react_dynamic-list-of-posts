import React, { useState, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

interface T {
  selectedPost: Post;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

export const NewCommentForm: React.FC<T> = ({
  selectedPost,
  setIsLoading,
  isLoading,
}) => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputText, setInputText] = useState('');
  const [inputNameSend, setInputNameSend] = useState(false);
  const [inputEmailSend, setInputEmailSend] = useState(false);
  const [inputTextSend, setInputTextSend] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setInputNameSend(true);
    setInputEmailSend(true);
    setInputTextSend(true);

    try {
      const newComment = {
        postId: selectedPost.id,
        name: inputName,
        email: inputEmail,
        body: inputText,
      };

      if (inputName !== '' && inputEmail !== '' && inputText !== '') {
        await client.post('/comments', newComment);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
    setInputNameSend(false);
  };

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
    setInputEmailSend(false);
  };

  const handleInputText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
    setInputTextSend(false);
  };

  const handleInputsClear = () => {
    setInputName('');
    setInputNameSend(false);
    setInputEmail('');
    setInputEmailSend(false);
    setInputText('');
    setInputTextSend(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit}>
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
            className={classNames('input',
              { 'is-danger': inputName === '' && inputNameSend })}
            value={inputName}
            onChange={handleInputName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {inputName === '' && inputNameSend && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {inputName === '' && inputNameSend && (
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
            placeholder="email@test.com"
            className={classNames('input',
              { 'is-danger': inputEmail === '' && inputEmailSend })}
            value={inputEmail}
            onChange={handleInputEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {inputEmail === '' && inputEmailSend && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {inputEmail === '' && inputEmailSend && (
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
            className={classNames('textarea',
              { 'is-danger': inputText === '' && inputTextSend })}
            value={inputText}
            onChange={handleInputText}
          />
        </div>

        {inputText === '' && inputTextSend && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link',
              { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleInputsClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
