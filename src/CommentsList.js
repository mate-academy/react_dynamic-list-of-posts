import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentsList = ({ commentsData }) => (
  <article className="comments">
    <dl>
      { commentsData.map(comment => (
        <Comment commentData={comment} key={comment.id} />
      ))}
    </dl>
  </article>
);

CommentsList.propTypes
= { commentsData: PropTypes.oneOfType([PropTypes.array]).isRequired };

export default CommentsList;
