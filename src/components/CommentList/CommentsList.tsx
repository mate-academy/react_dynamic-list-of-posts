import React from 'react';
import Comment from '../Comment/Comment';
import './ComentList.css';

type Props = {
  comments: Comment[];
};

const CommentsList: React.FC<Props> = ({ comments }) => {

  return (
    <section>
      <ul className="commentList">
        {comments.map(comment => (
          <li key={comment.id} className="commentList__item">
            <Comment
              name={comment.name}
              email={comment.email}
              body={comment.body}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CommentsList;
