import React, {
  useState,
  KeyboardEvent,
  MouseEvent,
  useContext,
  useCallback,
} from 'react';
import classNames from 'classnames';

import { Post } from '../types/Post';

// api

import { addComments } from '../api/api';
import { Context } from './Context';

type Props = {
  selectedPost: Post
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
}) => {
  const {
    commentList,
    setCommentList,
    setCommentListError,
  } = useContext(Context);

  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputText, setInputText] = useState('');

  const [loadingButtonAdd, setLoadingButtonAdd] = useState(false);

  // Dangers

  const [inputNameDagers, setInputNameDagers] = useState(false);
  const [inputEmailDagers, setInputEmailDagers] = useState(false);
  const [inputTextDagers, setInputTextDagers] = useState(false);

  const addComment = () => {
    if (!inputName) {
      setInputNameDagers(true);
    }

    if (!inputEmail) {
      setInputEmailDagers(true);
    }

    if (!inputText) {
      setInputTextDagers(true);
    }

    if (inputName && inputEmail && inputText) {
      const randomId = Math.floor(Math.random() * 1000000);
      const addCommentItem = {
        id: randomId,
        postId: selectedPost.id,
        name: inputName,
        email: inputEmail,
        body: inputText,
      };

      setLoadingButtonAdd(true);
      addComments(addCommentItem)
        .then(() => {
          if (commentList) {
            setCommentListError(false);
            setCommentList([...commentList, addCommentItem]);
            setInputText('');
            setLoadingButtonAdd(false);
          }
        })
        .catch(() => {
          setCommentListError(true);
          setInputText('');
          setLoadingButtonAdd(false);
        });
    }
  };

  // eslint-disable-next-line max-len
  const clickEnterInputs = useCallback((e: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      addComment();
    }
  }, [inputName, inputEmail, inputText]);

  const clickAddButton = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addComment();
  }, [inputName, inputEmail, inputText]);

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
            className={classNames('input', { 'is-danger': inputNameDagers })}
            value={inputName}
            onChange={(e) => {
              setInputName(e.target.value);
              setInputNameDagers(false);
            }}
            onKeyDown={clickEnterInputs}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {inputNameDagers && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {inputNameDagers && (
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
            className={classNames('input', { 'is-danger': inputEmailDagers })}
            value={inputEmail}
            onChange={(e) => {
              setInputEmail(e.target.value);
            }}
            onKeyDown={clickEnterInputs}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {inputEmailDagers && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {inputEmailDagers && (
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
            className={classNames('input', { 'is-danger': inputTextDagers })}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            onKeyDown={clickEnterInputs}
          />
        </div>

        {inputTextDagers && (
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
              'button',
              'is-link',
              { 'is-loading': loadingButtonAdd },
            )}
            onClick={clickAddButton}
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
              setInputText('');
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
