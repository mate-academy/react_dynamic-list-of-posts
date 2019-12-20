import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const Comments = ({ comments }) => (
  <section className="post__comments">
    <h2 className="post__comments--title title">Comments:</h2>
    {' '}
    {comments.map(comment => (
      <Comment commentProps={comment} key={comment.id} />
    ))}
  </section>
);

Comments.propTypes = { comments: PropTypes.arrayOf(PropTypes.object) };
Comments.defaultProps = { comments: [] };
export default Comments;
