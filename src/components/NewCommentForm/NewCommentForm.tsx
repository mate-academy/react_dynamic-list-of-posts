import classNames from 'classnames';
import React, { useContext, useReducer, useState } from 'react';
import * as commentsApiServise from '../../api/CommentApi';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { CurrentUserContext } from '../../Context/CurrentUserContext';
import {
  errorInputReducer,
  initialErrorState,
} from '../../Reducer/FormErrorsReducer';
import { initText, inputTextReducer } from '../../Reducer/FormInputReducer';
import { InputTextActions } from '../../types/FormInput';
import { Inputs } from '../../enum/Inputs';
import { NotificationContent } from '../../Context/NotificationManager';
import { CommentsContext } from '../../Context/CommentsContext';
import { IsFormContext } from '../../Context/IsForm';

type NewCommentFormProps = {
  postId: Post['id'];
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({ postId }) => {
  const { onSubmitComment } = useContext(CommentsContext);
  const { selectedUser } = useContext(CurrentUserContext);
  const { notificationDispatch } = useContext(NotificationContent);
  const { setCommentForm } = useContext(IsFormContext);

  const [loadingButton, setLoadingButton] = useState(false);
  const [inputState, inputDispatch] = useReducer(inputTextReducer, initText);
  const [inputErrorState, inputErrorDispatch] = useReducer(
    errorInputReducer,
    initialErrorState,
  );

  const getAction = (inputType: keyof typeof Inputs) => {
    let action: InputTextActions['type'];

    if (inputType === 'name') {
      action = 'SET_INPUT_NAME';
    } else if (inputType === 'email') {
      action = 'SET_INPUT_EMAIL';
    } else {
      action = 'SET_INPUT_BODY';
    }

    return action;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputType: keyof typeof Inputs,
  ) => {
    const message = event.target.value;
    const action: InputTextActions['type'] = getAction(inputType);

    inputDispatch({
      type: action,
      message,
    });

    const clearField = `SET_${inputType.toUpperCase()}_ERROR` as
      | 'SET_NAME_ERROR'
      | 'SET_EMAIL_ERROR'
      | 'SET_BODY_ERROR';

    inputErrorDispatch({
      type: clearField,
      message: '',
    });
  };

  const preSubmition = (comment: Omit<Comment, 'id'>) => {
    let isError = false;

    if (comment.name.length === 0) {
      inputErrorDispatch({
        type: 'SET_NAME_ERROR',
        message: 'Name is required',
      });
      isError = true;
    }

    if (comment.email.length === 0) {
      inputErrorDispatch({
        type: 'SET_EMAIL_ERROR',
        message: 'Email is required',
      });
      isError = true;
    }

    if (comment.body.length === 0) {
      inputErrorDispatch({
        type: 'SET_BODY_ERROR',
        message: 'Enter some text',
      });
      isError = true;
    }

    return isError;
  };

  const handleAddNewComment = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (!selectedUser) {
      return;
    }

    const newComment: Omit<Comment, 'id'> = {
      postId,
      name: inputState.name || '',
      email: inputState.email || '',
      body: inputState.body || '',
    };

    const hasError: boolean = preSubmition(newComment);

    if (hasError === true) {
      return;
    }

    try {
      setLoadingButton(true);

      const createdComment = await commentsApiServise.postComments(newComment);

      onSubmitComment(createdComment);
      inputDispatch({
        type: 'SET_INPUT_BODY',
        message: '',
      });
      notificationDispatch({
        type: 'SET_CLEAR',
        source: 'PostDetails',
      });
    } catch {
      notificationDispatch({
        type: 'SET_ERROR',
        error: 'Something went wrong',
        alarm: '',
        source: 'PostDetails',
      });
      inputDispatch({
        type: 'SET_INPUT_CLEAR',
      });
      setCommentForm(false);
    } finally {
      setLoadingButton(false);
    }
  };

  const onReset = () => {
    inputDispatch({
      type: 'SET_INPUT_CLEAR',
    });
    inputErrorDispatch({
      type: 'SET_CLEAR',
    });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleAddNewComment}>
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
            className={classNames('input', {
              'is-danger': inputErrorState.name.length > 0,
            })}
            value={inputState.name}
            onChange={event => handleInputChange(event, 'name')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {inputErrorState.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {inputErrorState.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {inputErrorState.name}
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
            className={classNames('input', {
              'is-danger': inputErrorState.email.length > 0,
            })}
            value={inputState.email}
            onChange={event => handleInputChange(event, 'email')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {inputErrorState.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {inputErrorState.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {inputErrorState.email}
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
            className={classNames('textarea', {
              'is-danger': inputErrorState.body.length > 0,
            })}
            value={inputState.body}
            onChange={event => handleInputChange(event, 'body')}
          />
        </div>

        {inputErrorState.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {inputErrorState.body}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': loadingButton,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={onReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
