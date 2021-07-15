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

export const NewCommentForm = ({ postId, callBack }) => {
  const [state, setState] = useState({
    body: '',
    name: '',
    email: '',
    error: false,
  });

  const handleSubmit = () => {
    if (!isEmail(email)) {
      setState(prevState => ({
        ...prevState, error: true,
      }));

      return;
    }

    const result = {
      postId, body, name, email,
    };

    callBack(result);
    setState({
      body: '',
      name: '',
      email: '',
      error: false,
    });
  };

  const handleSetState = (event) => {
    const { name, value } = event.target;

    if (!state[name] && !value.trim()) {
      return;
    }

    setState({
      ...state, error: false, [name]: value,
    });
  };

  const { body, name, email, error } = state;

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
          value={body}
          onChange={handleSetState}
        />

        <div className="text-fields__wrapper">
          <TextField
            variant="outlined"
            label="Name:"
            name="name"
            value={name}
            style={{
              width: 250, color: 'white',
            }}
            onChange={handleSetState}
          />
          <TextField
            type="email"
            variant="outlined"
            label="Email:"
            name="email"
            error={error}
            helperText={error && 'email is not valid'}
            value={email}
            style={{ width: 250 }}
            onChange={handleSetState}
          />
        </div>
      </div>

      <button
        type="button"
        className="button button__comments"
        onClick={handleSubmit}
      >
        PUBLIC
      </button>

    </div>

  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  callBack: PropTypes.func.isRequired,
};
