import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import './NewCommentForm.scss';

const isEmail = (email) => {
  /* eslint-disable no-useless-escape */
  /* eslint-disable max-len */
  const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regEmail.test(email);
};

export const NewCommentForm = ({ postId, onSubmit }) => {
  const [state, setState] = useState({
    body: '',
    name: '',
    email: '',
    errors: {
      body: false,
      name: false,
      email: false,
    },
  });

  const handleSubmit = () => {
    onSubmit({
      postId, body, name, email,
    });

    setState({
      body: '',
      name: '',
      email: '',
      errors: {
        body: false,
        name: false,
        email: false,
      },
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (!state[name] && !value.trim()) {
      return;
    }

    state.errors[name] = false;
    setState(currentState => ({
      ...currentState, [name]: value,
    }));
  };

  const handleErrors = (event) => {
    const { name } = event.target;

    state.errors[name] = true;
    setState({ ...state });
  };

  const { body, name, email, errors } = state;

  return (
    <div className="feedback__inputs">
      <div className="feedback__text-fields">
        <TextField
          variant="outlined"
          label="Comment:"
          style={{ width: 350 }}
          multiline
          rows={5}
          rowsmax={8}
          name="body"
          error={!!errors.body}
          helperText={!!errors.body && 'Comment should be more then 10 words'}
          value={body}
          onChange={handleChange}
          onBlur={event => body.length < 5 && handleErrors(event)}
        />

        <div className="text-fields__wrapper">
          <TextField
            variant="outlined"
            label="Name:"
            name="name"
            value={name}
            error={!!errors.name}
            helperText={!!errors.name && 'Name shold be more then 3 letters'}
            style={{ width: 250 }}
            onChange={handleChange}
            onBlur={event => name.length < 3 && handleErrors(event)}

          />
          <TextField
            type="email"
            variant="outlined"
            label="Email:"
            name="email"
            error={!!errors.email}
            helperText={!!errors.email && 'email is not valid'}
            value={email}
            style={{ width: 250 }}
            onChange={handleChange}
            onBlur={event => !isEmail(email) && handleErrors(event)}

          />
        </div>
      </div>

      <button
        type="button"
        className="button button__comments"
        disabled={
          Object.values(errors).some(value => value)
          || Object.values(state).some(value => !value)
        }
        onClick={handleSubmit}
      >
        PUBLIC
      </button>
    </div>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
