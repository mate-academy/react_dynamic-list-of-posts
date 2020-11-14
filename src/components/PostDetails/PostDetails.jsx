/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PostDetails.scss';

import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';

export const PostDetails = (props) => {
  const [post, setPost] = useState(null);
  const { selectedPostId } = props;

  useEffect(() => {
    if (selectedPostId) {
      getPostDetails(selectedPostId).then((res) => setPost(res));
    }
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      {selectedPostId && post ? (
        <>
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{post.title}</p>
          </section>

          <section className="PostDetails__comments">
            <button type="button" className="button">
              Hide 2 comments
            </button>

            <ul className="PostDetails__list">
              <li className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                >
                  X
                </button>
                <p>My first comment</p>
              </li>

              <li className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                >
                  X
                </button>
                <p>sad sds dfsadf asdf asdf</p>
              </li>
            </ul>
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm />
            </div>
          </section>
        </>
      ) : (
        'Select post'
      )}
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
