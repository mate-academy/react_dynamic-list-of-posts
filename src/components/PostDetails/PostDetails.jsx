import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, removeComment } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ selectedPost }) => {
  const [post, setPost] = useState('');
  const [comments, setComments] = useState([]);
  const [hiddenComments, setHiddenComments] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPost)
      .then(response => response.data)
      .then(postFromServer => setPost(postFromServer));
    getPostComments(selectedPost)
      .then(commentsFromServer => setComments(commentsFromServer));
  }, [selectedPost]);

  const hideComments = () => {
    setHiddenComments(!hiddenComments);
  };

  const deleteComment = (commentId) => {
    removeComment(commentId)
      .then(() => getPostComments(selectedPost))
      .then(result => setComments(result));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          onClick={hideComments}
          className="button"
        >
          { `${hiddenComments ? 'Hide' : 'Show'} ${comments.length} comments` }
        </button>

        {!hiddenComments && (
          <ul className="PostDetails__list">
            { comments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  onClick={() => deleteComment(comment.id)}
                  type="button"
                  className="PostDetails__remove-button button"
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPost}
            setComments={setComments}
          />
        </div>
      </section>

    </div>
  );
};

PostDetails.propTypes = {
  selectedPost: PropTypes.number.isRequired,
};
