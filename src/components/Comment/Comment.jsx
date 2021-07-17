import React from 'react';
import PropTypes from 'prop-types';
import './Comment.scss';

export const Comment = ({ body, email, createdAt, name, id, onSubmit }) => (
  < >
    <div className="comment__logo-block">
      <img
        // eslint-disable-next-line
        src="https://as1.ftcdn.net/v2/jpg/04/12/57/22/1000_F_412572270_OGw5hFLVwWoBCOdwWjLa1qGHsYU444PI.jpg"
        alt=""
      />
      <span>{name}</span>
    </div>
    <div className="comment__body">
      <p>{body}</p>
    </div>
    <div className="comment__info">
      <span>{email}</span>
      {'    '}
      <span>{createdAt}</span>
    </div>

    <button
      type="button"
      className="button button__delete"
      onClick={() => onSubmit(id)}
    >
      Delete
    </button>
  </>
);

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
