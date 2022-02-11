import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import './PostDetails.scss';

import { NewCommentForm } from '../NewCommentForm';

import { loadPostComments, deleteComment } from '../../api/comments';
import { loadUserPostDetails } from '../../api/posts';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({
  postId,
}) => {
  const [isCommentsHidden, setIsCommentsHidden] = useState(true);
  const [userComments, setUserComments] = useState<Post[]>([]);
  const [userPostTitle, setUserPostTitle] = useState('');

  const getPostData = async () => {
    const [postDetailsFromServer, userCommentsFromServer] = await Promise.all([
      loadUserPostDetails(postId),
      loadPostComments(postId),
    ]);

    setUserComments(userCommentsFromServer);
    setUserPostTitle(postDetailsFromServer.title);
  };

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
    getPostData();
  }, [postId]);

  const handleButtonHide = () => {
    setIsCommentsHidden(!isCommentsHidden);
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
          className={cn({ 'PostDetails__list--hide': !isCommentsHidden }, 'PostDetails__list')}
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
