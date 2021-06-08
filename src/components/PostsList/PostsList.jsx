import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({ userId, selectPostId }) => {
  const [posts, setPosts] = useState([]);
  const [selectUser, setUser] = useState(0);
  const [selectPost, setPost] = useState(0);

  useEffect(() => {
    fetch('https://mate-api.herokuapp.com/posts')
      .then(response => response.json())
      .then(posts => setPosts(posts.data));
  }, []);

  if (selectUser !== userId) {
    getUserPosts(userId)
      .then(posts => setPosts(posts.data));
    setUser(userId);
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>
                [User #
                {post.userId}
                ]:
                {' '}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                selectPostId(post.id);
                selectPost === post.id ? setPost(0) : setPost(post.id);
              }}
            >
              {selectPost !== post.id ? 'Open' : 'Close'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
