import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';
import { Loader } from '../Loader';
import { Comments } from '../Comments';

export const PostDetails = ({ selectedPostId }) => {
  const [post, getPost] = useState(null);
  const [showedComments, showComments] = useState(true);
  const [comments, getComments] = useState(null);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(getPost);

    getPostComments(selectedPostId)
      .then(getComments);
  }, [selectedPostId]);

  if (!post) {
    return (
      <Loader />
    );
  }

  return (

    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        {
          !comments || comments.length === 0
            || (
              <>
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    showComments(!showedComments);
                  }}
                >
                  {`${!showedComments ? `Show` : 'Hide'} 
                ${comments.length} comments`}
                </button>
                {
                  !showedComments
                  || (
                    <Comments
                      comments={comments}
                      getComments={getComments}
                      selectedPostId={selectedPostId}
                    />
                  )
                }
              </>
            )
        }
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            getComments={getComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
