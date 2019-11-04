import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <tr>
    <td>
      <p>
        Author:
        {comment.name}
      </p>
      <p>
        Email:
        {comment.email}
      </p>
      {/* <p>
        Address:
        {comment.address.street}
        ,
        {comment.address.city}
        ,
        {comment.address.suite}
      </p> */}
    </td>
    <td>{comment.body}</td>
  </tr>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    body: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default Comment;
