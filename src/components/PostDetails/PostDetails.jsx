import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getPostDetails } from '../../api/message';
import { getPostComments, removePostComment } from '../../api/comments';

import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';

import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState({});
  const [commentsVisibility, setCommentsVisibility] = useState(false);

  useEffect(() => {
    setComments(null);
    setPost(null);

    loadPostDetails();
    loadPostComments();
  }, [selectedPostId]);

  const loadPostDetails = () => {
    getPostDetails(selectedPostId)
      .then((postFromServer) => {
        setPost(postFromServer.data);
      });
  };

  const loadPostComments = () => {
    setComments(null);
    getPostComments()
      .then((commentsFromServer) => {
        setComments(commentsFromServer.data
          .filter(comment => comment.postId === selectedPostId));
      });
  };

  return (
    !post ? (
      <Loader />
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
              {`Show ${comments ? comments.length : ''} comments`}
            </button>
          ) : (
            <button
              type="button"
              className="button"
              onClick={() => setCommentsVisibility(true)}
            >
              {`Hide ${comments ? comments.length : ''} comments`}
            </button>
          )}

          <ul className="PostDetails__list">
            {!comments ? (
              <Loader />
            ) : (
              commentsVisibility
              || comments
                .map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={async() => {
                        await removePostComment(comment.id);
                        await loadPostComments();
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
              setComments={setComments}
              loadPostComments={loadPostComments}
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
