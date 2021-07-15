import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from '../Comment';
import './Comments.scss';

export const Comments = ({ comments, callBack }) => (
  <div className="comments">

    <ul className="comments__list">
      {
        comments.map(comment => (
          <li className="comment" key={comment.id}>
            <Comment
              {...comment}
              callBack={callBack}
            />
          </li>
        ))
      }
    </ul>

  </div>
);

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  callBack: PropTypes.func.isRequired,
};
