import React, { useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  details: string,
  comments: Comment[],
  onAdd: (name: string, email:string, text:string) => void,
  onDelete: (commentId: string) => void,
};

export const PostDetails: React.FC<Props> = ({
  details, comments, onAdd, onDelete,
}) => {
  const [defaultVisibility, setVisibility] = useState(true);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.currentTarget.name === 'hide'
    || event.currentTarget.name === 'show') {
      setVisibility(!defaultVisibility);
    } else {
      onDelete(event.currentTarget.value);
    }
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
            onClick={handleClick}
          >
            {`Hide ${comments.length} comments`}
          </button>
        )}
        {!defaultVisibility && comments.length > 0 && (
          <button
            type="button"
            className="PostsList__button button"
            name="show"
            onClick={handleClick}
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
                    onClick={handleClick}
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
