import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment';

const CommentList = ({ list }) => (
  <div>
    {list.map(
      item => <Comment key={item.id} {...item} />
    )}
  </div>
);

CommentList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
};

export default CommentList;
