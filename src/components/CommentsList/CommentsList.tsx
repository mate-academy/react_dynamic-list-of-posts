import React, { MouseEventHandler, useState } from 'react';
// Components
import { CommentCard } from '../CommentCard';
// Types
import { Comment } from '../../types/Comment';
import { LoadComments } from '../../types/LoadComments';

type Props = {
  comments: Comment[];
  loadComments: LoadComments;
};

export const CommentsList: React.FC<Props> = ({ comments, loadComments }) => {
  const [commentsIsVisible, setCommentsIsVisible] = useState<boolean>(false);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setCommentsIsVisible(!commentsIsVisible);
  };

  return (
    <>
      <button
        type="button"
        className="button"
        onClick={clickHandler}
      >
        {`${commentsIsVisible ? 'Hide' : 'Show'} ${comments.length} comments`}
      </button>

      <ul className="PostDetails__list">
        {commentsIsVisible && comments.map(({ id, postId, body }) => (
          <li key={id} className="PostDetails__list-item">
            <CommentCard
              id={id}
              postId={postId}
              body={body}
              loadComments={loadComments}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
