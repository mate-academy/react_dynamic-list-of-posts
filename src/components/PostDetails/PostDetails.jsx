import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getComments } from '../../api/comments';

// eslint-disable-next-line react/prop-types
export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const [commetnsFromServer, postFromServer] = await Promise
        .all([getComments(postId), getPostDetails(postId)]);

      setPost(postFromServer);
      setComments(commetnsFromServer);
    };

    fetchData();
  }, [postId]);

  if (!post) {
    return null;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length
          ? (
            <button
              type="button"
              className="button"
            >
              {`Hide ${comments.length} comments`}
            </button>
          ) : ''}

        <ul className="PostDetails__list">
          {comments.map(comment => (
            <li key={comment.id} className="PostDetails__list-item">
              <button
                type="button"
                className="PostDetails__remove-button button"
              >
                X
              </button>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
};
