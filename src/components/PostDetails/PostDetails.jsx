import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment, addComment } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ selectedId = undefined }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const wholePost = getPostDetails(selectedId);
      const commentList = await getPostComments(selectedId);

      Promise.all([wholePost, commentList])
        .then(([postDetails, postComments]) => {
          setPost(postDetails);
          setComments(postComments);
        });
    }

    if (selectedId) {
      fetchData();
    } else {
      setPost(null);
    }
  }, [selectedId]);

  const removeComment = async(id) => {
    await deleteComment(id);

    const commentList = await getPostComments(selectedId);

    setComments(commentList);
  };

  const createComment = async(comment) => {
    const newComment = {
      ...comment, postId: post.id,
    };

    await addComment(newComment);

    const commentList = await getPostComments(selectedId);

    setComments(commentList);
  };

  const toggleVisibility = () => {
    setVisible(prevVisible => !prevVisible);
  };

  return (
    post && (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>{post.body}</p>
        </section>

        <section className="PostDetails__comments">
          <button
            type="button"
            className="PostDetails__button button"
            onClick={toggleVisibility}
          >
            {isVisible ? 'Hide' : 'Show'}
            {' '}
            {comments.length}
            {' '}
            comments
          </button>

          {isVisible && (
          <ul className="PostDetails__list">
            {
              comments.map(comment => (
                <li
                  key={comment.id}
                  className="PostDetails__list-item"
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => removeComment(comment.id)}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))
            }
          </ul>
          )
          }
        </section>

        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm createComment={createComment} />
          </div>
        </section>
      </div>
    )
  );
};

PostDetails.propTypes = {
  selectedId: PropTypes.number,
};

PostDetails.defaultProps = {
  selectedId: undefined,
};
