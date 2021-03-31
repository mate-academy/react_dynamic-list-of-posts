import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../store';

import { createPost } from '../../api/api';
import '../NewCommentForm/NewCommentForm.scss';

export const NewPost = () => {
  const dispatch = useDispatch();
  const [isFormValid, setIsFormValid] = useState(true);
  const [inputs, setInputs] = useState({
    title: '', body: '',
  });

  const handleChange = ({ name, value }) => {
    setInputs(prevInputs => ({
      ...prevInputs, [name]: value,
    }));
    setIsFormValid(true);
  };

  const clearForm = () => {
    setInputs({
      title: '',
      body: '',
    });
  };

  const handleSubmit = async(event) => {
    const { title, body } = inputs;

    event.preventDefault();

    if (title.trim().length > 0
    && body.trim().length > 0) {
      await createPost(inputs);
      clearForm();
      setIsFormValid(true);
      dispatch(getPosts());
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <>
      <form
        className="NewCommentForm"
        onSubmit={event => handleSubmit(event)}
      >
        <div className="form-field">
          <input
            type="text"
            name="title"
            placeholder="Post title"
            className="NewCommentForm__input"
            value={inputs.title}
            onChange={event => handleChange(event.target)}
          />
        </div>

        <div className="form-field">
          <textarea
            name="body"
            placeholder="Type post here"
            className="NewCommentForm__input"
            value={inputs.body}
            onChange={event => handleChange(event.target)}
          />
        </div>

        <button
          type="submit"
          className="NewCommentForm__submit-button button"
        >
          Add new post
        </button>
      </form>

      {!isFormValid && (
      <div className="alarm">
        <p>Fields should not be empty</p>
      </div>
      )}

    </>
  );
};
