import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TypePost } from '../../types';
import './PostsList.scss';
import { getUserPosts, getAllPosts } from '../../api/posts';
import { Post } from '../Post/Post';

export const PostsList = ({
  userId,
  handleClick,
  selectedPost,
  setPost,
}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (userId === 0) {
      getAllPosts()
      // eslint-disable-next-line
        .then((posts) => {
          // eslint-disable-next-line
          posts = posts.filter(post => (post.userId <= 10 && (post.userId)));

          return posts;
        })
        .then(setPosts);

      return;
    }

    getUserPosts(userId)
    // eslint-disable-next-line
      .then((posts) => {
        setPosts(posts.map(post => ({
          comments: [],
          id: post.id,
          userId: post.userId,
          title: post.title,
          body: post.body,
        })));
      });
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <Post
            setPost={setPost}
            selectedPost={selectedPost}
            handleClick={handleClick}
            key={post.id}
            post={post}
          />
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedPost: TypePost.isRequired,
  setPost: PropTypes.func.isRequired,
};
