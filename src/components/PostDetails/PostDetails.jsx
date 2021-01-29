import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostComments } from '../../api/comments';
import { TypePost } from '../../types';

export const PostDetails = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [isVisisble, setVisibility] = useState(true);

  useEffect(() => {
    getPostComments(post.id)
      .then(commentsFomServer => (!commentsFomServer
        ? setComments([])
        : setComments(commentsFomServer)));
  }, []);

  const addComment = (comment) => {
    setComments(prev => [...prev, comment]);
  };

  const removeComment = (commentId) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const postComments = comments.filter(comment => comment.postId === post.id);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        {postComments.length === 0 && 'There is no comment to display'}
        {(postComments.length > 0 && isVisisble === true) && (
          <>
            <button
              type="button"
              className="button"
              onClick={() => {
                setVisibility(false);
              }}
            >
              Hide
              {' '}
              {postComments.length}
              {' '}
              comments
            </button>
            <ul className="PostDetails__list">

              {postComments.map(comment => (
                <li key={comment.id} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => removeComment(comment.id, post.id)}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </>
        )}
        {(postComments.length > 0 && isVisisble === false) && (
          <button
            type="button"
            className="button"
            onClick={() => {
              setVisibility(true);
            }}
          >
            Show
            {' '}
            {postComments.length}
            {' '}
            comments
          </button>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={post.id} addComment={addComment} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  post: TypePost.isRequired,
};
