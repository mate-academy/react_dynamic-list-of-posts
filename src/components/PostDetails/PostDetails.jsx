import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Comments } from '../Comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import { getPostComments } from '../../api/comments';

import './PostDetails.scss';

export const PostDetails = ({ selectedPost }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsVisibility, setCommentsVisibility] = useState(false);

  useEffect(() => {
    loadPost();
    updateComments();
  }, [selectedPost]);

  const loadPost = async() => {
    const postDetails = await getPostDetails(selectedPost);

    setPost(postDetails);
  };

  const updateComments = async() => {
    const postComments = await getPostComments(selectedPost);

    setComments(postComments);
  };

  const toggleComments = () => {
    setCommentsVisibility(!commentsVisibility);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        {post && (
          <p>{post.body}</p>
        )}
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={toggleComments}
        >
          {
            commentsVisibility
              ? 'Hide comments'
              : 'Show comments'
          }
        </button>

        {
          commentsVisibility && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <Comments
                  id={comment.id}
                  body={comment.body}
                  updateComments={updateComments}
                />
              ))}
            </ul>
          )
        }
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPost}
            updateComments={updateComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPost: PropTypes.number.isRequired,
};
