import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import {getUserPosts} from "../../api/posts";

export const PostDetails = ({ posts, selectedPostId }) => {
  const [selectedPost, setPost] = useState([]);

  useEffect(() => {
    if (selectedPost === 'undefined') {
      return;
    }
    setPost(
      posts.find(post => post.id === selectedPostId)
    );
  }, [selectedPostId]);

  console.log(selectedPost);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <h3>{selectedPost && selectedPost.title}</h3>
        <p>{selectedPost && selectedPost.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button type="button" className="button">Hide 2 comments</button>

        <ul className="PostDetails__list">
          <li className="PostDetails__list-item">
            <button
              type="button"
              className="PostDetails__remove-button button"
            >
              X
            </button>
            <p>My first comment</p>
          </li>

          <li className="PostDetails__list-item">
            <button
              type="button"
              className="PostDetails__remove-button button"
            >
              X
            </button>
            <p>sad sds dfsadf asdf asdf</p>
          </li>
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm/>
        </div>
      </section>
    </div>
  );
}
