import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getPostDetails } from '../../api/posts';
import { getPostComments, removePostComment } from '../../api/comments';

import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentsVisibility, setCommentsVisibility] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [selectedPostId]);

  const loadData = () => {
    setPost(null);

    getPostDetails(selectedPostId)
      .then((result) => {
        setComments(null);
        setPost(result.data);

        return result.data;
      })
      .then((postFromServer) => {
        getPostComments()
          .then((commentsFromServer) => {
            setComments(commentsFromServer.data
              .filter(comment => postFromServer.id === comment.postId));
          });
      });
  };

  return (
    !post ? (
      <span>Loading...</span>
    ) : (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>{post.title}</p>
        </section>

        <section className="PostDetails__comments">
          {commentsVisibility ? (
            <button
              type="button"
              className="button"
              onClick={() => setCommentsVisibility(false)}
            >
              {`Show ${comments && comments.length} comments`}
            </button>
          ) : (
            <button
              type="button"
              className="button"
              onClick={() => setCommentsVisibility(true)}
            >
              {`Hide ${comments && comments.length} comments`}
            </button>
          )}

          <ul className="PostDetails__list">
            {!comments ? (
              <span>Loading...</span>
            ) : (
              commentsVisibility
              || comments
                .map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => {
                        removePostComment(comment.id);
                        loadData();
                      }}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                )))}
          </ul>
        </section>

        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm
              postId={selectedPostId}
              loadData={loadData}
            />
          </div>
        </section>
      </div>
    )
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
