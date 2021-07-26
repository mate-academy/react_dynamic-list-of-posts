import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState(null);
  const [isCommentsVisible, setVisibilityOfComments] = useState(true);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);
  const showComments = async() => {
    const commentsFromServer = await getPostComments(selectedPostId);

    await setComments(commentsFromServer);
  };

  useEffect(() => {
    setLoading(true);

    const loadData = async() => {
      await getPostDetails(selectedPostId)
        .then((postDetailsFromServer) => {
          setPostDetails(postDetailsFromServer);
        });

      await showComments();
      setLoading(false);
    };

    loadData();
  }, [selectedPostId]);

  const removeComment = async({ target }) => {
    setLoadingComments(true);

    await deleteComment(target.dataset.commentid);
    await showComments();

    setLoadingComments(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.body}</p>
      </section>

      {loadingComments
        ? <Loader />
        : (
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => {
                setVisibilityOfComments(
                  currentVisibility => !currentVisibility,
                );
              }}
            >
              {isCommentsVisible ? 'Hide' : 'Show'}
              {' '}
              {comments.length}
              {' '}
              comments
            </button>

            {isCommentsVisible
              ? (
                <ul className="PostDetails__list">
                  {comments.map(comment => (
                    <li
                      key={comment.id}
                      className="PostDetails__list-item"
                    >
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
              )
              : ''}
          </section>
        )
      }
      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postDetails.id}
            showComments={showComments}
            setLoadingComments={setLoadingComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
