import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, removeComment } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([true]);

  useEffect(() => {
    const fetchData = async() => {
      const postFromServer = await getPostDetails(selectedPostId);

      setPost(postFromServer.data);
      loadComments();
    };

    fetchData();
  }, [selectedPostId]);

  const loadComments = async() => {
    const commentsFromServer = await getPostComments(selectedPostId);

    setComments(commentsFromServer);
  };

  const onHideComments = () => {
    setShowComments(prevShowComments => !prevShowComments);
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
          className="button"
          onClick={onHideComments}
        >
          {showComments ? 'Hide ' : 'Show '}
          {comments.length}
          &nbsp;comments
        </button>

        {showComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    removeComment(comment.id);
                    loadComments();
                  }}
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
          <NewCommentForm loadComments={loadComments} postId={post.id} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
