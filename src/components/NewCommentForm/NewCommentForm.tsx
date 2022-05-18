import React, { useEffect, useMemo, useState } from 'react';
import './NewCommentForm.scss';
import { postComment } from '../../api/comments';

type Props = {
  postId: number;
  changeReload: () => void;
};

export const NewCommentForm: React.FC<Props> = React.memo((
  { postId, changeReload },
) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    body: '',
  });
  const [formValid, setFormValid] = useState(true);

  /* eslint-disable max-len */
  /* eslint-disable no-useless-escape */
  const emailValidation
  = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setFormValid(true);
  };

  const stateReset = () => {
    setForm({
      name: '',
      email: '',
      body: '',
    });
  };

  useEffect(() => {
    stateReset();
  }, [postId]);

  const formValidation = useMemo(() => {
    return (
      form.name.length > 0
      && emailValidation.test(form.email)
      && form.body.length > 0);
  }, [form.name, form.email, form.body]);

  const toPostComment = () => {
    postComment(postId, form.name, form.email, form.body)
      .then(() => (changeReload()));
    stateReset();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();

        if (formValidation) {
          toPostComment();
        } else {
          setFormValid(false);
        }
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input NewCommentForm__input--textarea"
          value={form.body}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>

      {!formValid && (
        <p className="NewCommentForm__warning-message">
          Enter valid data!
        </p>
      )}
    </form>
  );
});
