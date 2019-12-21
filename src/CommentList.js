import PropTypes from 'prop-types';
import React from 'react';
import Comment from './Comment';

const CommentList = ({ findcommet }) => (
  <section className="commentSection">
    {
      findcommet.map(comment => (
        <Comment key={Math.random() * 1000} comment={comment} />))
    }
  </section>
);

CommentList.propTypes = (
  { findcommet: PropTypes.arrayOf(PropTypes.any).isRequired }
);

export default CommentList;
