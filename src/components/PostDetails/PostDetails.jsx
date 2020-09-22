import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { getPostComments, deleteComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [comments, setComments] = useState([]);
  const [flagCommentsHidden, setFlagCommentsHidden] = useState(false);
  const [postContent, setPostContent] = useState({});

  useEffect(() => {
    getPostComments(selectedPostId).then(setComments);
    getPostDetails(selectedPostId).then(setPostContent);
  }, [selectedPostId, comments]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {postContent.body}
        </p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setFlagCommentsHidden(!flagCommentsHidden)}
        >
          {
            `${flagCommentsHidden ? 'Show' : 'Hide'} ${comments.length} comments`
          }
        </button>

        <ul className="PostDetails__list">
          {flagCommentsHidden || (
            comments.map(({ body, id }) => (
              <li className="PostDetails__list-item" key={id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    deleteComment(id);
                    getPostComments(selectedPostId).then(setComments);
                  }}
                >
                  X
                </button>
                <p>
                  {body}
                </p>
              </li>
            )))}

        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm selectedPostId={selectedPostId} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: propTypes.number.isRequired,
};
