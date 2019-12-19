import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ item }) => (
  <div className="comment">
    <p>
      {'Comment - '}
      {item.id}
      {<br />}
    </p>
    <p>
      {item.body}
      {<br />}
    </p>
    <p>
      {'E-mail - '}
      {item.email}
      {<br />}
    </p>
  </div>
);

Comment.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.any
  ).isRequired,
};

export default Comment;
