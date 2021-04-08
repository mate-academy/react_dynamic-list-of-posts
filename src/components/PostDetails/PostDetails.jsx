import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deletePostComment } from '../../api/comments';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState();
  const [postComments, setPostComments] = useState();

  useEffect(() => {
    getPostDetails(selectedPostId).then(result => setPostDetails(result));
    getPostComments(selectedPostId).then(result => setPostComments(result));
  }, [selectedPostId, postComments]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{postDetails && postDetails.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button type="button" className="button">
          {`Hide ${postComments && postComments.length} comments`}
        </button>

        <ul className="PostDetails__list">
          {postComments && postComments.map(comment => (
            <li className="PostDetails__list-item" key={comment.id}>
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => deletePostComment(comment.id)}
              >
                X
              </button>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};
