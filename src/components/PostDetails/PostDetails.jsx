import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import {
  getPostDetails,
  getPostComments,
  addComment,
  deleteComment,
} from '../../api/posts';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [visibility, setVisibility] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setPost(await getPostDetails(postId));
      setComments(await getPostComments(postId));
    }

    fetchData();
  }, [postId]);

  const onCommentAdd = async({
    userName,
    userEmail,
    commentText,
  }) => {
    await addComment({
      postId,
      name: userName,
      email: userEmail,
      body: commentText,
    });
    setComments(await getPostComments(postId));
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
          onClick={() => {
            setVisibility(curVisibility => !curVisibility);
          }}
        >
          {visibility ? 'Hide' : 'Show'}
          {' '}
          comments
        </button>

        <ul
          className={`PostDetails__list ${!visibility ? 'hidden' : ''}`}
        >
          {
            comments.map(comment => (
              <li className="PostDetails__list-item">
                <button
                  onClick={async() => {
                    await deleteComment(comment.id);
                    setComments(await getPostComments(postId));
                  }}
                  type="button"
                  className="PostDetails__remove-button button"
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))
          }
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            onCommentAdd={onCommentAdd}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
