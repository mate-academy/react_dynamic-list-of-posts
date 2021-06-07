import React, { useState, useEffect } from 'react';

import './PostDetails.scss';

import { deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState(null);
  const [postComments, setPostComments] = useState(null);
  const [visibleComments, setVisibleComments] = useState(true);

  useEffect(() => {
    getPostComments(selectedPostId).then(setPostComments);
    getPostDetails(selectedPostId).then(setPostDetails);
  }, []);

  const deleteComm = async (commentId) => {
    await deleteComment(commentId, { method: 'DELETE' })
      .then(getPostComments(selectedPostId).then(setPostComments));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
  
      <h3>{postDetails ? postDetails.title : 'No title'}</h3>
  
      <section className="PostDetails__post">
        <p>{postDetails ? postDetails.body : 'No text'}</p>
      </section>
  
      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setVisibleComments(current => !current)}
        >
          {visibleComments ? 'Hide' : 'Show'}
          {' '}
          {postComments && (postComments.length === 1 ? '1 comment' : `${postComments.length} comments`)}
        </button>
  
        <ul className="PostDetails__list">
          {postComments && visibleComments && postComments.map(postComment => (
            <li
              key={postComment.id}
              className="PostDetails__list-item"
            >
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => deleteComm(postComment.id)}
              >
                X
              </button>
              <p>{postComment.body}</p>
            </li>
          ))}
        </ul>
      </section>
  
      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm selectedPostId={selectedPostId}/>
        </div>
      </section>
    </div>
  );
}
