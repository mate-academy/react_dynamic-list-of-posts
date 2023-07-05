import React, { useState } from 'react';
import { postNewComment } from '../utils/helperFunctions';

type Props = {
  postId: number,
};

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: '',
    postId,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setNewComment(currentComment => ({
      ...currentComment,
      [name]: value,
    }));
  };

  const handleSubmitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postNewComment(newComment);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmitComment}
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
            placeholder="Name Surname"
            className="input is-danger"
            onChange={handleInputChange}
            value={newComment.name}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Name is required
        </p>
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
            className="input is-danger"
            value={newComment.email}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Email is required
        </p>
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
            className="textarea is-danger"
            // value={newComment.text}
            onChange={handleInputChange}
          />
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Enter some text
        </p>
      </div>

      <div className="field is-grouped">
        <div className="control">
          {/* <button type="submit" className="button is-link is-loading"> */}
          <button type="submit" className="button is-link">
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
