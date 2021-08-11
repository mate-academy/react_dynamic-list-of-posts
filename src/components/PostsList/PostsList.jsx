import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getPosts, getUserPosts } from '../../api/post';
import './PostsList.scss';

export const PostsList = ({ selectedUser, postEdited, selectedPost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (selectedUser) {
      getUserPosts(selectedUser).then(setPosts);
    } else {
      getPosts().then(setPosts);
    }
  }, [selectedUser]);

  const postHandler = (postId) => {
    if (postId === selectedPost) {
      postEdited(null);
    } else {
      postEdited(postId);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className={classNames(
                'PostsList__button button',
                { active: post.id === selectedPost },
              )}
              onClick={() => postHandler(post.id)}
            >
              {selectedPost === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selectedUser: PropTypes.number.isRequired,
  postEdited: PropTypes.func.isRequired,
  selectedPost: PropTypes.number.isRequired,
};
