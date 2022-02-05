import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';
import { BASE_URL } from '../../api/api';

interface Props {
  postId: number,
}

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [postDetails, setPostDetails] = useState<PostComment>();
  const [postComments, setpostComments] = useState<PostComment[]>([]);
  const [isHidden, setHidden] = useState(false);

  const getDetails = async () => {
    const details = await getPostDetails(postId);

    setPostDetails(details);
  };

  useEffect(() => {
    getDetails();
  }, [postId]);

  const getComments = async () => {
    const comments = await getPostComments(postId);

    setpostComments(comments);
  };

  useEffect(() => {
    getComments();
  }, [postId]);

  const handleHideButton = () => {
    setHidden(!isHidden);
  };

  const deleteComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const URL = `${BASE_URL}/comments/${+event.currentTarget.name}`;
    const response = await fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    getComments();

    return response.json();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          name={`${postDetails?.id}`}
          type="button"
          className="button"
          onClick={handleHideButton}
        >
          {isHidden ? 'Show' : 'Hide'}
        </button>
        {!isHidden && (
          <ul className="PostDetails__list">
            {postComments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  name={`${comment.id}`}
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={deleteComment}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            updateComent={getComments}
          />
        </div>
      </section>
    </div>
  );
};
