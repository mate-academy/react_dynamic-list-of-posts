import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './PostDetails.scss';

import { NewCommentForm } from '../NewCommentForm';

import { getPostDetails } from '../../api/posts';
import { deleteComment, getPostComments } from '../../api/comments';

export const PostDetails = ({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState([]);
  const [commentsVisibility, setCommentsVisibility] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostDetails = async() => {
      const postResponse = await getPostDetails(selectedPostId);
      const commentsResponse = await getPostComments(selectedPostId);

      setSelectedPost(postResponse);
      setComments(commentsResponse);
    };

    fetchPostDetails();
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <h3>{selectedPost.title}</h3>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setCommentsVisibility(!commentsVisibility);
          }}
        >
          {`${commentsVisibility
            ? 'Hide' : 'Show'} ${comments.length} comments`
          }
        </button>
        {commentsVisibility && (
          <ul className="PostDetails__list">

            {comments.map(({ id, body }) => (

              <li
                className="PostDetails__list-item"
                key={id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    deleteComment(id)
                      .then(() => getPostComments(selectedPostId))
                      .then(setComments);
                  }}
                >
                  X
                </button>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        )}

      </section>
      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            setComments={setComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
