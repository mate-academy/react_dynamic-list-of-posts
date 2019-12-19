import PropTypes from 'prop-types';
import React from 'react';

const Comment = ({ comment: { name, body, email, id } }) => (
  <div className="comment">
    <dt>
      {`Comment ${id}: ${body}`}
    </dt>
    <dd className="description">
      {`Name: ${name}`}
      <br />
      {`Email: ${email}`}
    </dd>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Comment;
