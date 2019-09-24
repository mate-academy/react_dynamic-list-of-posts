import React from 'react';
import './Comment.css';
import PropTypes from 'prop-types';

function Comment({ comment, user }) {
  const { name, body, email } = comment;
  const userName = user.name;

  return (
    <ul className="list-group-item list-group-item-info comment">
      <p className="list-group-item list-group-item-info comment__head">
        {name}
      </p>
      <p className="list-group-item list-group-item-info comment__body">
        {body}
      </p>
      <p className="list-group-item list-group-item-info comment__user-info">
        {`user: ${userName} (${email})`}
      </p>
    </ul>
  );
}

Comment.defaultProps = {
  user: {
    name: 'Guest',
  },
};

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    body: PropTypes.string,
    email: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default Comment;
