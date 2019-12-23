import React from 'react';
import PropsTypes from 'prop-types';
import User from './User';

const Comments = ({ postComments }) => (
  <div className="post__comments">
    {postComments.map(comment => (
      <div className="comment">
        <p>
          {comment.body}
        </p>
        <User person={comment} />
      </div>
    ))}
  </div>
);

Comments.propTypes = { postComments: PropsTypes.arrayOf.isRequired };

export default Comments;
