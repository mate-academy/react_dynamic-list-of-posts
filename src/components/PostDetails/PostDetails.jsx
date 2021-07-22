import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/coments';
import { removeCommentFromServer } from '../../api/coments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetail, setPostDetail] = useState('');
  const [postComments, setPostComments] = useState('');
  const [visibleComments, setVisibleComments] = useState(true);

  const loadComments = () => {
    getPostComments(selectedPostId)
      .then(response => setPostComments(response));
  };

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(response => setPostDetail(response));

    loadComments();
  }, [selectedPostId]);

  const changeVisibleComments = () => {
    setVisibleComments(!visibleComments);
  };

  const removeComment = async({ target }) => {
    await removeCommentFromServer(target.dataset.commentid);
    loadComments();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetail && postDetail.body}</p>
      </section>

      <section className="PostDetails__comments">
        {postComments && postComments.length
          ? (
            <button
              type="button"
              className="button"
              onClick={changeVisibleComments}
            >
              {visibleComments ? 'Hide' : 'Show'}
              {` - ${postComments.length} - `}
              comments
            </button>
          ) : (
            <h4>no comments</h4>
          )}

        <ul className="PostDetails__list">
          {(postComments && visibleComments) && postComments.map(comment => (
            <li className="PostDetails__list-item" key={comment.id}>
              <button
                type="button"
                className="PostDetails__remove-button button"
                data-commentid={comment.id}
                onClick={removeComment}
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
            loadComments={loadComments}
          />
        </div>
      </section>
    </div>
  );
};
