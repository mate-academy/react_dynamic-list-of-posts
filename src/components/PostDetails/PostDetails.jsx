import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { requestPostsById, updatePost } from '../../api/api';
import './PostDetails.scss';
import { selectedPostId, getPosts } from '../../store';
import { NewCommentForm } from '../NewCommentForm';

export const PostDetails = () => {
  const dispatch = useDispatch();
  const selectedPost = useSelector(selectedPostId);
  const [post, setPost] = useState({});
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [isPostEditing, setIsPostEditing] = useState(false);

  const loadPostDetails = useCallback(async() => {
    const postFromServer = await requestPostsById(selectedPost);

    setPost(postFromServer);
    setPostTitle(postFromServer.title);
    setPostBody(postFromServer.body);
  }, [selectedPost]);

  useEffect(() => {
    loadPostDetails();
  }, [loadPostDetails]);

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (postTitle.trim() && postBody.trim()) {
      await updatePost(selectedPost, postTitle, postBody);
      setIsPostEditing(false);
      dispatch(getPosts());
      loadPostDetails();
    } else {
      setIsPostEditing(false);
    }
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {!isPostEditing
        ? (
          <section className="PostDetails__post">
            <h3><em>{post.title}</em></h3>
            {post.body ? <p>{post.body}</p> : <Loader />}
            <button
              type="button"
              className="button"
              onClick={() => setIsPostEditing(true)}
            >
              Edit post
            </button>
          </section>
        )
        : (
          <form
            className="NewCommentForm"
            onSubmit={event => handleSubmit(event)}
          >

            <div className="form-field">
              <input
                name="title"
                placeholder="Type titlr here"
                className="NewCommentForm__input"
                value={postTitle}
                onChange={event => setPostTitle(event.target.value)}
              />
            </div>

            <div className="form-field">
              <textarea
                name="body"
                placeholder="Type post here"
                className="NewCommentForm__input"
                value={postBody}
                onChange={event => setPostBody(event.target.value)}
              />
            </div>

            <button
              type="submit"
              className="NewCommentForm__submit-button button"
            >
              Update post
            </button>
          </form>
        )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
};
