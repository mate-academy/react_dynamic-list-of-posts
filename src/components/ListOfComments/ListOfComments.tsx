import React from 'react';
import './ListOfComments.css';

type Props = {
  comments: Comment[];
};

const ListOfComments: React.FC<Props> = ({ comments }) => {
  return (
    <ul className="comment__list">
      {comments.length > 0 && comments.map(comment => (
        <li key={comment.id} className="comment__item">
          <p className="comment__name">
            {comment.name}
          </p>
          <p className="comment__body">
            {comment.body}
          </p>
          <a href={`mailto:${comment.email}`} className="comment__email">
            {comment.email}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ListOfComments;
