import React, { useEffect, useState } from 'react';
import { usePostsContext } from '../../customHooks/usePostsContext';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import './PostDetails.scss';
import { Post } from '../../types/Post';
import { deleteComment, getPostComments } from '../../api/comments';

export const PostDetails: React.FC = React.memo(() => {
  const { selectedPostId, comments, setComments } = usePostsContext();
  const [postDetails, setPostDetails] = useState<Post>();
  const [isCommentsVisible, setIsCommentsVisible] = useState(true);

  const handleClick = () => {
    setIsCommentsVisible((state) => !state);
  };

  const loadPostDetails = () => {
    getPostDetails(selectedPostId)
      .then(setPostDetails);
  };

  const loadPostComments = () => {
    getPostComments(selectedPostId)
      .then(setComments);
  };

  const toDeleteComment = (commentId = 0) => {
    deleteComment(commentId);
    const filteredComments = comments.filter(
      comment => comment.id !== commentId,
    );

    setComments(filteredComments);
  };

  useEffect(() => {
    Promise.all([loadPostDetails(), loadPostComments()]);
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>

      {comments.length > 0 && (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={handleClick}
          >
            {isCommentsVisible
              ? (
                `Hide ${comments.length} comment(s)`
              ) : (
                `Show ${comments.length} comment(s)`
              )}
          </button>

          {isCommentsVisible && (
            <ul className="PostDetails__list">
              {comments.map(({ id, body }) => (
                <li key={id} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => toDeleteComment(id)}
                  >
                    X
                  </button>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
});
