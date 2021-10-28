import React, { useEffect, useState } from 'react';
import { getPostComments, removePostComment } from '../../api/comments';
import { getPostDetails } from '../../api/postDetails';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [postDetails, setPostDetails] = useState<Post>();
  const [postComments, setPostComments] = useState<PostComment[]>([]);

  useEffect(() => {
    getPostDetails(postId)
      .then(result => setPostDetails(result));
  }, [postId]);

  useEffect(() => {
    getPostComments(postId)
      .then(result => setPostComments(result));
  }, [postId]);

  const handleToggler = () => {
    setIsVisible(!isVisible);
  };

  const removeComment = (commentId: number) => (
    removePostComment(commentId)
      .then(() => {
        setPostComments(postComments.filter(item => item.id !== commentId));
      })
  );

  const onCreateComment = (comment: PostComment) => {
    setPostComments([...postComments, comment]);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        {postDetails && (
          <p>{postDetails.body}</p>
        )}
      </section>

      <section className="PostDetails__comments">
        {postComments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={handleToggler}
          >
            {isVisible
              ? `Hide ${postComments.length} comments`
              : `Show ${postComments.length} comments`}
          </button>
        )}

        {isVisible && (
          <ul className="PostDetails__list">
            {postComments && (
              postComments.map(item => (
                <li
                  key={item.id}
                  className="PostDetails__list-item"
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      removeComment(item.id);
                    }}
                  >
                    X
                  </button>
                  <p>
                    {item.body}
                  </p>
                </li>
              ))
            )}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          {postId > 0 && (
            <NewCommentForm
              postId={postId}
              onCreatedComment={onCreateComment}
            />
          )}
        </div>
      </section>
    </div>
  );
};
