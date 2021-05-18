import React, { useState } from 'react';
import './NewCommentForm.scss';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

export const NewCommentForm = React.memo(({
  addNewComment,
}) => {
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    addNewComment(newComment);

    setNewComment({
      name: '',
      email: '',
      body: '',
    });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setNewComment(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newComment.name}
          {...register('name', { required: true })}
          onChange={handleChangeInput}
        />
        {errors.name
          && <p className="NewCommentForm__error">Name is required.</p>
        }
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newComment.email}
          {...register('email', { required: true },  { pattern: /\S+@\S+/ })}
          onChange={handleChangeInput}
        />
        {errors.email
          && <p className="NewCommentForm__error">Email is required and must be valid.</p>
        }
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comments here"
          className="NewCommentForm__input"
          value={newComment.body}
          {...register('body', { required: true })}
          onChange={handleChangeInput}
        />
        {errors.body
          && <p className="NewCommentForm__error">Comment body text is required.</p>
        }
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
});

NewCommentForm.propTypes = {
  addNewComment: PropTypes.func.isRequired,
};
