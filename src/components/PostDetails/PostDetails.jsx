import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPostComments, deleteComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [details, setDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isCommentsVisible, setCommentsVisible] = useState(true);
  const [needRefresh, setRefresh] = useState(false);

  const activateLoader = () => setLoading(true);
  const deactivateLoader = () => setLoading(false);

  const refresh = () => setRefresh(!needRefresh);

  const loadAllDetails = () => {
    getPostDetails(selectedPostId)
      .then(setDetails);

    getPostComments(selectedPostId)
      .then(setComments)
      .then(deactivateLoader);
  };

  const showComments = () => setCommentsVisible(true);
  const hideComments = () => setCommentsVisible(false);

  useEffect(loadAllDetails, []);

  useEffect(() => {
    activateLoader();
    loadAllDetails();
  }, [selectedPostId, needRefresh]);

  return (
    <>
      {(!details || isLoading) ? (
        <Loader />
      ) : (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{details.body}</p>
          </section>

          <section className="PostDetails__comments">

            {!isCommentsVisible ? (
              <button
                type="button"
                className="button"
                onClick={showComments}
              >
                Show comments
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="button"
                  onClick={hideComments}
                >
                  Hide comments
                </button>
                <ul className="PostDetails__list">
                  {comments.map(comment => (
                    <li
                      key={comment.id}
                      className="PostDetails__list-item"
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => {
                          deleteComment(comment.id)
                            .then(refresh);
                        }}
                      >
                        X
                      </button>
                      <p>{comment.body}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                selectedPostId={selectedPostId}
                onRefreshDetails={refresh}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
