import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import { loadPostComments, deleteComment } from '../../api/comments';

type Props = {
  userPostTitle: string;
  userComments: Post[];
  postId: number;
  selectorValue: number;
  setUserComments: React.Dispatch<React.SetStateAction<Post[]>>;
};

export const PostDetails: React.FC<Props> = ({
  userPostTitle,
  userComments,
  postId,
  selectorValue,
  setUserComments,
}) => {
  const [isCommemtsHidden, setIsCommemtsHidden] = useState(true);

  const getPostComments = async () => {
    const userCommentsFromServer = await loadPostComments(postId);

    setUserComments(userCommentsFromServer);
  };

  const handleDeleteComment = async (id: number) => {
    await deleteComment(id);
    await getPostComments();
  };

  useEffect(() => {
    getPostComments();
  }, [selectorValue]);

  const handleButtonHide = () => {
    setIsCommemtsHidden(!isCommemtsHidden);
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
          className={isCommemtsHidden ? 'PostDetails__list' : 'PostDetails__list--hide'}
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
            getUserComments={getPostComments}
            postId={postId}
          />
        </div>
      </section>
    </div>
  );
};
