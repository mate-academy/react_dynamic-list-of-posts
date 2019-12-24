import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentsList = ({ list }) => (
  <div>
    {list.map(item => (
      <Comment comment={item} key={item.name} />
    ))}
  </div>
);

CommentsList.propTypes
  = { list: PropTypes.arrayOf(PropTypes.object).isRequired };
export default CommentsList;
