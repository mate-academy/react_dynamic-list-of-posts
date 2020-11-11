import React, { useState } from 'react';
import { CommentsProps } from '../../props/CommentsProps';
import { Comment } from '../Comment';

export const Comments = ({ comments, removeComment }) => {
  const [isVisibleComments, setIsVisibleComments] = useState(true);
  const commentsLength = comments.length;

  return !commentsLength
    ? <p>No comments</p>
    : (
      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setIsVisibleComments(isVisible => !isVisible);
          }}
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
