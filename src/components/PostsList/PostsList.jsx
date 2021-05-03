/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

import { getUserPosts } from '../../api/posts';

export const PostsList = ({ selector, setDetailsVisible, setPostId }) => {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (selector === 'All users' || selector === '') {
      getUserPosts()
        .then(result => result.filter(post => post.userId !== null))
        .then(result => result.filter(post => post.title !== null))
        .then(result => setPosts(result.map(post => ({
          ...post,
          open: false,
        }))));
    } else {
      getUserPosts()
        .then(result => result.filter(post => post.userId === +selector))
        .then(result => result.filter(post => post.userId !== null))
        .then(result => result.filter(post => post.title !== null))
        .then(result => setPosts(result));
    }
  }, [selector]);

  const closeAll = () => {
    posts.forEach(post => (post.open = false));
    setValue(value + 1);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                User #
                {post.userId}
                :
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              hidden={post.open}
              onClick={() => {
                closeAll();
                post.open = !post.open;
                setPostId(post.id);
                setDetailsVisible(false);
              }}
            >
              Open
            </button>
            <button
              type="button"
              hidden={!post.open}
              className="PostsList__button button active"
              onClick={() => {
                closeAll();
                setDetailsVisible(true);
                setPostId(0);
              }}
            >
              Close
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selector: PropTypes.string.isRequired,
  setDetailsVisible: PropTypes.func.isRequired,
  setPostId: PropTypes.func.isRequired,
};
