import React, { FormEvent, useState } from 'react';
import { Comment, CommentData } from '../types/Comment';

import { postComment } from '../api/postComment';
import { Post } from '../types/Post';

interface Props {
  selectedPost: Post;
  handleAddNewComment: (comments: Comment) => void;
  setIsError: (isError: boolean) => void;
}

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  handleAddNewComment,
  setIsError,
}) => {
  const [formState, setFormState] = useState({
    name: { value: '', error: '' },
    email: { value: '', error: '' },
    text: { value: '', error: '' },
    isLoading: false,
  });

  const resetForm = () => {
    setFormState({
      name: { value: '', error: '' },
      email: { value: '', error: '' },
      text: { value: '', error: '' },
      isLoading: false,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newFormState = { ...formState };

    if (!newFormState.name.value) {
      newFormState.name.error = 'Name is required';
    }

    if (!newFormState.email.value) {
      newFormState.email.error = 'Email is required';
    }

    if (!newFormState.text.value) {
      newFormState.text.error = 'Enter some text';
    }

    if (
      newFormState.name.error ||
      newFormState.email.error ||
      newFormState.text.error
    ) {
      setFormState(newFormState);

      return;
    }

    setFormState({ ...newFormState, isLoading: true });

    const newComment: CommentData = {
      name: newFormState.name.value,
      email: newFormState.email.value,
      body: newFormState.text.value,
      postId: selectedPost.id,
    };

    try {
      const res = await postComment('/comments', newComment);

      handleAddNewComment(res);
    } catch (error) {
      setIsError(true);
    } finally {
      setFormState(prevState => ({
        ...prevState,
        isLoading: false,
        text: { ...prevState.text, value: '' },
      }));
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: { value, error: '' },
    }));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
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
            className={`input ${formState.name.error && 'is-danger'}`}
            onChange={e => handleChange('name', e.target.value)}
            value={formState.name.value}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formState.name.error && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formState.name.error && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formState.name.error}
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
            className={`input ${formState.email.error && 'is-danger'}`}
            value={formState.email.value}
            onChange={e => handleChange('email', e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formState.email.error && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formState.email.error && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formState.email.error}
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
            className={`textarea ${formState.text.error && 'is-danger'}`}
            value={formState.text.value}
            onChange={e => handleChange('text', e.target.value)}
          />
        </div>

        {formState.text.error && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formState.text.error}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${formState.isLoading && 'is-loading'}`}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
