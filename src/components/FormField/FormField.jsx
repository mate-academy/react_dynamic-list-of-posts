import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
const EMAIL_VALIDATION = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const FormField = (props) => {
  const { value, changeHandler, name, errors, setErrors } = props;
  const error = errors[name];

  const validateInput = () => {
    let errorMessage = '';

    if (!value) {
      errorMessage = `Please add ${name}`;
    }

    if (value && name === 'email' && !EMAIL_VALIDATION.test(value)) {
      errorMessage = 'Please add correct email adress';
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  return (
    <div className="Form-field">
      {
        name !== 'comment'
          ? (
            <input
              type="text"
              name={name}
              placeholder={`Your ${name}`}
              value={value}
              className={classNames('NewCommentForm__input', {
                'NewCommentForm__error-input': error,
              })}
              onChange={changeHandler}
              onBlur={validateInput}
            />
          ) : (
            <textarea
              name="body"
              placeholder="Type comment here"
              className={classNames('NewCommentForm__input', {
                'NewCommentForm__error-input': error,
              })}
              value={value}
              onChange={changeHandler}
              onBlur={validateInput}
            />

          )
      }

      <h5 className="error">{error}</h5>
    </div>
  );
};

FormField.propTypes = {
  value: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    comment: PropTypes.string,
  }).isRequired,
  setErrors: PropTypes.func.isRequired,
};
