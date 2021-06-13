import React, { useState, useEffect } from 'react';

import { getAllPosts } from '../../api/posts';
import { getUserPosts } from '../../api/posts';

import { Loader } from '../Loader';

import classNames from 'classnames';

import './PostsList.scss';

export const PostsList = ({ selectedUserId, selectedPostId, setSelectedPostId, setIsLoading }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (selectedUserId) {
      getUserPosts(selectedUserId).then(setPosts);
    } else {
      getAllPosts().then(setPosts);
    }
  }, [selectedUserId])

  const onPostClicked = (postId) => {
    if (postId === selectedPostId) {
      return setSelectedPostId(0);
    }
    
    setSelectedPostId(postId);
    setIsLoading(true);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {posts.length ? (
        <ul className="PostsList__list">
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>[User #{post.userId}]: </b>
              {post.title}
            </div>
            <button
              type="button"
              onClick={() => onPostClicked(post.id)}
              className={classNames({
                'PostsList__button': true,
                button: true,
                'button--active': post.id === selectedPostId
              })}
            >
              {post.id === selectedPostId
                ? 'Close'
                : 'Open'
              }
            </button>
          </li>
        ))}
      </ul>
      ) : (
        <p>
          User has no posts yet
        </p>
      )}
    </div>
  );
};
