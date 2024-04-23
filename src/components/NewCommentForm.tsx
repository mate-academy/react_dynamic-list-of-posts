import React from 'react';
import cn from 'classnames';

import { NewCommentField } from './NewCommentField';
import { useGlobalDispatchContext } from './GlobalStateProvider';

import * as commentService from '../api/comments';

type Props = {
  id: number | null;
};
export const NewCommentForm: React.FC<Props> = ({ id }) => {
  const dispatch = useGlobalDispatchContext();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [resetCount, setResetCount] = React.useState(0);
  const [submitCount, setSubmitCount] = React.useState(0);

  const initialFormState = {
    postId: id,
    name: '',
    email: '',
    body: '',
  };

  const [formState, setFormState] = React.useState(initialFormState);

  const handleNewComment = (name: string, value: string) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.body) {
      setIsError(true);

      return;
    }

    setIsLoading(true);
    commentService
      .addComment(formState)
      .then(comment => {
        dispatch({
          type: 'ADD_COMMENT',
          payload: comment,
        });
        setIsLoading(false);
        setFormState({
          ...formState,
          body: '',
        });
        setSubmitCount(submitCount + 1);
        setIsError(false);
      })
      .catch(() => {
        setIsLoading(false);
        dispatch({
          type: 'SET_SIDEBAR_ERROR',
          payload: 'Something went wrong',
        });
      });
  };

  const handleOnReset = () => {
    setFormState(initialFormState);
    setResetCount(resetCount + 1);
    setIsError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleOnSubmit}
      onReset={handleOnReset}
    >
      <NewCommentField
        key={`field-name-${resetCount}`}
        name="name"
        dataCy="NameField"
        label="Author Name"
        id="comment-author-name"
        placeholder="Name Surname"
        onChange={handleNewComment}
        fieldType="input"
        required={isError && !formState.name}
      />

      <NewCommentField
        key={`field-email-${resetCount}`}
        name="email"
        dataCy="EmailField"
        label="Author Email"
        id="comment-author-email"
        placeholder="email@test.com"
        onChange={handleNewComment}
        fieldType="input"
        required={isError && !formState.email}
      />

      <NewCommentField
        key={`field-submit-${resetCount}-${submitCount}`}
        name="body"
        dataCy="BodyField"
        label="Comment Text"
        id="comment-body"
        placeholder="Type comment here"
        onChange={handleNewComment}
        fieldType="textarea"
        required={isError && !formState.body}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', {
              'is-loading': isLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
