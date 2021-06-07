import React, { useState, useEffect} from 'react';

import './PostDetails.scss';

import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';

import { NewCommentForm } from '../NewCommentForm';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState(null);
  const [postComments, setPostComments] = useState(null)
  const [visibleComments, setVisibleComments] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId).then(setPostDetails);
    getPostComments(selectedPostId).then(setPostComments);
  }, [selectedPostId]);

  const getUpdatedComments = async() => {
    const comments = await getPostComments(selectedPostId);
    setPostComments(comments);
  };

  const toggleComments = () => setVisibleComments(current => !current);

  return (
    <div className="PostDetails">
      <h2>{postDetails ? postDetails.title : 'No title'}</h2>

      <section className="PostDetails__post">
        <p>{postDetails ? postDetails.body : 'No body'}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={toggleComments}
        >
          {visibleComments ? 'Hide ' : 'Show '}
          {postComments && (postComments.length === 1 ? '1 comment' : `${postComments.length} comments`)}
        </button>

        {postComments && visibleComments && (
          <ul className="PostDetails__list">
            {postComments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={async() => {
                    await deleteComment(comment.id);
                    await getUpdatedComments();
                  }}
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
            selectedPostId={selectedPostId}
            getUpdatedComments={getUpdatedComments}
          />
        </div>
      </section>
    </div>
  );
};
