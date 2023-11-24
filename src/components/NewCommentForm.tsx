import React, { useState } from 'react';

export const NewCommentForm: React.FC = () => {
  const [formData] = useState({
    name: '',
    email: '',
    body: '',
  });

  const { name, email, body } = formData;

  // const handleFormDataChange = (name: string, value: string) => {
  //   setFormData(prevData => (
  //     {
  //       ...prevData,
  //       [name]: value,
  //     }
  //   ))
  // }

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
            className="input is-danger"
            required
            value={name}
            // onChange={handleFormDataChange}
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
            value={email}
            // onChange={handleFormDataChange}
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
            value={body}
            // onChange={handleFormDataChange}
          />
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Enter some text
        </p>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link is-loading">
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
// 1. The form requires an author's name and email and a comment text.
//     - show errors only after the form is submitted;
//     - remove an error on the field change;
//     - keep the `name` and `email` after the successful submit but clear a comment text;
//     - The `Clear` button should also clear all errors;
//     - Add the `is-loading` class to the submit button while waiting for a response;
//     - Add the new comment received as a response from the `API` to the end of the list;
// 1. Implement comment deletion
//     - Delete the commnet immediately not waiting for the server response to improve the UX.
// 1. (*) Handle `Add` and `Delete` errors so the user can retry
