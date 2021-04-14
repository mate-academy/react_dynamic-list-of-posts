import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getOnePost } from '../../api/posts';
import { getComments, deleteComment } from '../../api/comments';
import { Loader } from '../Loader';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOnePost(postId).then(result => setPost(result));
    getComments(postId).then((result) => {
      setComments(result);
      setLoading(false);
    });
  }, [postId]);

  const deleteSelectedComment = async(commentIdforDelete) => {
    await deleteComment(commentIdforDelete);
    setComments(prevComments => prevComments
      .filter(comment => comment.id !== commentIdforDelete));
  };

  const addNewComment = (comment) => {
    setComments(prevComments => [...prevComments, comment]);
  };

  if (loading === true) {
    return (
      <Loader />
    );
  }

  if (post === null) {
    return (
      <p>No post selected</p>
    );
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{post.title}</p>
      </section>
      <section className="PostDetails__comments">
        {showComment ? (
          <button
            type="button"
            className={(comments.length === 0)
              ? 'button-none' : 'button'}
            onClick={() => setShowComment(false)}
          >
            {`Hide ${comments.length} comments`}
          </button>
        ) : (
          <button
            type="button"
            className={(comments.length === 0)
              ? 'button-none' : 'button'}
            onClick={() => setShowComment(true)}
          >
            {`show ${comments.length} comments`}
          </button>
        )}
        {showComment && (
        <ul className="PostDetails__list">
          {comments.map(comment => (
            <li className="PostDetails__list-item">
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => deleteSelectedComment(comment.id)}
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
            postId={postId}
            addCommentLocal={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
