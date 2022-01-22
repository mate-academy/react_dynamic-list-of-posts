import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, remove } from '../../api/comments';
import { Loader } from '../Loader/index';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[] | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [error, setError] = useState('');

  const loadComments = async () => {
    const allPostComments = await getPostComments();

    const currentPostComments
    = allPostComments.filter(postComment => postComment.postId === selectedPostId);

    setPostComments(currentPostComments);
  };

  const loadData = async () => {
    try {
      setError('');

      const [currentPostDetails, allPostComments] = await Promise.all([
        getPostDetails(selectedPostId), getPostComments(),
      ]);

      const currentPostComments
      = allPostComments.filter(postComment => postComment.postId === selectedPostId);

      setPostComments(currentPostComments);

      setPostDetails(currentPostDetails);
    } catch (err) {
      setError(`${err}`);
    }
  };

  const removeComent = async (postCommentId: number) => {
    await remove(postCommentId);
    loadComments();
  };

  useEffect(() => {
    setPostDetails(null);
    setPostComments(null);
    loadData();
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <h2>{error}</h2>

      {(postDetails && postComments) ? (
        <>
          <section className="PostDetails__post">
            <p>{postDetails?.title}</p>
          </section>

          <section className="PostDetails__comments">
            {isVisible ? (
              <button
                type="button"
                className="button"
                onClick={() => setIsVisible(false)}
              >
                {`Hide ${postComments?.length} comments`}
              </button>
            ) : (
              <button
                type="button"
                className="button"
                onClick={() => setIsVisible(true)}
              >
                {`Show ${postComments?.length} comments`}
              </button>
            )}

            {isVisible && (
              <ul className="PostDetails__list">
                {postComments?.map(postComment => (
                  <li
                    key={`${postComment.id}`}
                    className="PostDetails__list-item"
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => removeComent(Number(postComment.id))}
                    >
                      X
                    </button>
                    <p>{postComment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                id={postDetails?.id}
                loadComments={loadComments}
              />
            </div>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
