import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import { PostComments } from '../PostComments';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [hideStatus, setHideStatus] = useState(false);

  useEffect(() => {
    loadDetails();
    updateComments();
  }, [selectedPostId]);

  const loadDetails = async() => {
    const postDetails = await getPostDetails(selectedPostId);

    setPost(postDetails);
    setHideStatus(false);
  };

  const updateComments = async() => {
    const postComments = await getPostComments(selectedPostId);

    setComments(postComments);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length ? (
          <button
            type="button"
            className="button"
            onClick={() => setHideStatus(!hideStatus)}
          >
            {hideStatus
              ? `Hide ${comments.length} comments`
              : 'Show comments'
            }
          </button>
        ) : (
          <h3>No comments</h3>
        )}

        {hideStatus
          && (
            <PostComments
              comments={comments}
              updateComments={updateComments}
            />
          )
        }
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            updateComments={updateComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
