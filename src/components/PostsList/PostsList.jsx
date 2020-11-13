import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';

export const PostsList = () => {
  const [posts, setPosts] = useState([]);

  const loadPosts = async() => {
    const loadedPosts = await getUserPosts();

    setPosts(loadedPosts);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <ul>
      {posts.map(post => (
        <li
          className="PostsList__item"
          key={post.id}
        >
          <div>
            <b>{`[User #${post.userId}]:`}</b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
          >
            Close
          </button>
        </li>
      ))}
    </ul>
  );
};
