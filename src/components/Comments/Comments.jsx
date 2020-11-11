import React, { useCallback, useMemo, useState } from 'react';
import { CommentsProps } from '../../props/CommentsProps';
import { Comment } from '../Comment';

export const Comments = ({ comments, removeComment }) => {
  const [isVisibleComments, setIsVisibleComments] = useState(false);
  const commentsLength = useMemo(
    () => comments.length,
    [comments],
  );

  const handleClick = useCallback(
    () => {
      setIsVisibleComments(isVisible => !isVisible);
    },
    [],
  );

  if (!commentsLength) {
    return <p>No comments</p>;
  }

  return (
    <section className="PostDetails__comments">
      <button
        type="button"
        className="button"
        onClick={handleClick}
      >
        {
          isVisibleComments
            ? `Hide ${commentsLength} comments`
            : `Show ${commentsLength} comments`
        }
      </button>

      {isVisibleComments && (
        <ul className="PostDetails__list">
          {comments.map(({ body, id }) => (
            <li className="PostDetails__list-item" key={id}>
              <Comment
                body={body}
                id={id}
                removeComment={removeComment}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

Comments.propTypes = CommentsProps;
