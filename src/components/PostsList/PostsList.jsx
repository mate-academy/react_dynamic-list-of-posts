import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({ selectedUserId }) => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    loadPosts();
  }, [selectedUserId])

  const loadPosts = async() => {
    const postsFromServer = await getUserPosts(selectedUserId);
    setPosts(postsFromServer);
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map( post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>[User #{post.userId}]: </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
            >
              Open
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
};
