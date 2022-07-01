import React, { useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  details: string,
  comments: Comment[],
  onAdd: (comment: NewComment) => void,
  onDelete: (commentId: string) => void,
};

export const PostDetails: React.FC<Props> = ({
  details, comments, onAdd, onDelete,
}) => {
  const [defaultVisibility, setVisibility] = useState(true);

  const buttonVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setVisibility(!defaultVisibility);
  };

  const deleteComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    onDelete(event.currentTarget.value);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{details}</p>
      </section>

      <section className="PostDetails__comments">
        {defaultVisibility && comments.length > 0 && (
          <button
            type="button"
            className="PostsList__button button"
            name="hide"
            onClick={buttonVisibility}
          >
            {`Hide ${comments.length} comments`}
          </button>
        )}
        {!defaultVisibility && comments.length > 0 && (
          <button
            type="button"
            className="PostsList__button button"
            name="show"
            onClick={buttonVisibility}
          >
            {`Show ${comments.length} comments`}
          </button>
        )}

        {defaultVisibility && comments.length > 0 && (
          <ul className="PostDetails__list">
            {comments.map((comment: Comment) => {
              return (
                <li
                  key={comment.id}
                  className="PostDetails__list-item"
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    value={`${comment.id}`}
                    onClick={deleteComment}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm onAdd={onAdd} />
        </div>
      </section>
    </div>
  );
};
