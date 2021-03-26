import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getPostComments, remove } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const deleteComment = commentId => (
    remove(`/comments/${commentId}`)
  );

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(response => (
        setPost(response)
      ));
  }, [selectedPostId]);

  useEffect(() => {
    getPostComments('/comments')
      .then(response => (response))
      .then(response => setComments(response.filter(comment => (
        comment.postId === post.id
      ))));
  }, [comments]);

  const showHandler = () => {
    setIsVisible(current => !current);
  };

  // console.log(comments);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{post.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={showHandler}
        >
          {!isVisible
            ? `Show ${comments.length} comments`
            : `Hide ${comments.length} comments`

          }
        </button>

        {isVisible && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteComment(comment.id)}
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
          <NewCommentForm postId={post.id} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number,
};

PostDetails.defaultProps = {
  selectedPostId: 0,
};
