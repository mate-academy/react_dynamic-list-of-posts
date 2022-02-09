import React, { useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  userPostTitle: string;
  userComments: Post[];
  handleDeleteComment: (id: number) => Promise<void>;
  postId: number;
  getUserComments: () => Promise<void>;
};

export const PostDetails: React.FC<Props> = ({
  userPostTitle,
  userComments,
  handleDeleteComment,
  postId,
  getUserComments,
}) => {
  const [hideCommentsButton, setHideCommentsButton] = useState(true);

  const handleButtonHide = () => {
    setHideCommentsButton(!hideCommentsButton);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{userPostTitle}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button button-visible"
          onClick={handleButtonHide}
        >
          {`Hide ${userComments.length} comments`}
        </button>

        <ul
          className={hideCommentsButton ? 'PostDetails__list' : 'PostDetails__list--hide'}
        >
          {userComments.map(commentary => (
            <li key={commentary.id} className="PostDetails__list-item">
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => handleDeleteComment(commentary.id)}
              >
                X
              </button>
              <p>{commentary.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            getUserComments={getUserComments}
            postId={postId}
          />
        </div>
      </section>
    </div>
  );
};
