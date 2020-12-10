import React from 'react';
import { CommentsTypes } from './CommentsTypes';

import { deletePostComment } from '../../api/posts';

export const Comments = React.memo(({ comments, setComments }) => (
  <ul className="PostDetails__list">
    {comments.map(comment => (
      <li
        key={comment.id}
        className="PostDetails__list-item"
      >
        <button
          type="button"
          className="PostDetails__remove-button button"
          onClick={() => {
            deletePostComment(comment.id);
            setComments(comments.filter(element => element.id !== comment.id));
          }}
        >
          X
        </button>
        <p>{comment.body}</p>
      </li>
    ))}
  </ul>
));

Comments.propTypes = CommentsTypes;
