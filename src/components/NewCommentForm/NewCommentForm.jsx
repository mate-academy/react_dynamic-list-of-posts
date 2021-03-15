import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ onAdd, postId }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    body: '',
  });

  const onChangeValue = (e) => {
    const { value, name } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      body: '',
    });
  };

  const newComment = {
    postId,
    ...form,
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(newComment);
        resetForm();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={onChangeValue}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={form.email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={onChangeValue}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={form.body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={onChangeValue}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        disabled={Object.values(form).includes('')}
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};
