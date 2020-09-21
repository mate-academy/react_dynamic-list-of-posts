import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ selectedPost }) => {
  const [postDetails, setPostDetails] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [hideComments, setHideComments] = useState(true);

  function loadPostComments() {
    getPostComments()
      .then(commentsFromServer => setCommentData(commentsFromServer
        .filter(comment => comment.postId === selectedPost)));
  }

  useEffect(() => {
    getPostDetails(selectedPost)
      .then((postFromServer) => {
        if (selectedPost) {
          setPostDetails(postFromServer);
        }
      });
    loadPostComments();
  }, [selectedPost]);

  return (

    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <h3>{postDetails.title}</h3>
        <p>{postDetails.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setHideComments(!hideComments);
          }}
        >
          {`${hideComments ? 'Show' : 'Hide'} ${commentData.length} comments`}
        </button>
        {hideComments && (
          <>
            <ul className="PostDetails__list">
              {commentData.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      deleteComment(comment.id)
                        .then(loadPostComments);
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
            selectedPost={selectedPost}
            loadPostComments={loadPostComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPost: PropTypes.number.isRequired,
};
