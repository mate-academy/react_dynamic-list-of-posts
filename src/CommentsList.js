import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentsList = ({ commentsData }) => (
  <article className="comments">
    <dl>
      { commentsData.map(({ name, email, body, id }) => (
        <Comment name={name} email={email} body={body} key={id} />
      ))}
    </dl>
  </article>
);

CommentsList.propTypes
= { commentsData: PropTypes.oneOfType([PropTypes.array]).isRequired };

export default CommentsList;
