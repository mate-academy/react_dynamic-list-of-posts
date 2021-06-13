import React, { useState, useEffect } from 'react';

import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';

import { getPost } from '../../api/posts';
import { getPostComments, removeComment, addComment } from '../../api/comments';

import './PostDetails.scss';

export const PostDetails = ({ selectedPostId, isLoading, setIsLoading }) => {
  const [post, setPost] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [commentsVisible, setCommentsVisible] = useState(true);
  
  useEffect(() => {
    setPost(null);
    Promise.all([getPost(selectedPostId), getPostComments(selectedPostId)])
      .then(([post, comments]) => {
        setPost(post);
        setPostComments(comments);
        setCommentsVisible(true);
        setIsLoading(false);
      })
  }, [selectedPostId, setIsLoading]);

  const setCommentsVisibility = () => {
    setCommentsVisible(value => !value);
  };

  const deleteComment = (commentId) => {
    removeComment(commentId)
      .then(() => getPostComments(selectedPostId))
      .then(setPostComments);
  };

  const addNewComment = (name, email, body) => {
    const newComment = {
      name,
      email,
      body,
      postId: selectedPostId,
    };
    
    addComment(newComment)
      .then(() => getPostComments(selectedPostId))
      .then(setPostComments);
  };

  const onLoading = () => {
    return isLoading
     ? <Loader />
     : (
      <p>
        Pick a post to see the details
      </p>
    )
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {post ? (
        <>
          <section className="PostDetails__post">
            <p>
              {post.title}
            </p>
          </section>
    
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={setCommentsVisibility}
            >
              {commentsVisible
                ? `Hide ${postComments.length} comment(s)`
                : `Show ${postComments.length} comment(s)`
              }
            </button>

            <ul className="PostDetails__list">
              {commentsVisible && postComments.map(comment => (
                <li
                  className="PostDetails__list-item"
                  key={comment.id}
                >
                  <button
                    type="button"
                    title="click to delete"
                    className="PostDetails__remove-button button"
                    onClick={() => deleteComment(comment.id)}
                  >
                    X
                  </button>
                  <p>
                    {comment.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>
    
          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                addNewComment={addNewComment}
              />
            </div>
          </section>
        </>
      ) : onLoading()}
    </div>
  );
}
