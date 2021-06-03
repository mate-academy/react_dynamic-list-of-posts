import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import classNames from 'classnames';
import { getPosts, getUserPosts } from '../../api/posts';

export const PostsList = ({ selectedUser, onChangePost, selectedPost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (selectedUser === 0) {
      getPosts().then(data => setPosts(data));
    } else {
      getUserPosts(selectedUser).then(data => setPosts(data));
    }
  }, [selectedUser]);

  const postHandler = (postId) => {
    if (postId === selectedPost) {
      onChangePost(null);
    } else {
      onChangePost(postId);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.length ? (
          posts.map(({ id, userId, title, body }) => (
            <li key={id} className="PostsList__item">
              <div>
                <b>
                  [User #$
                  {userId}
                  ]:
                  {' '}
                </b>
                {title}
              </div>
              <button
                type="button"
                className={classNames(
                  'PostsList__button button',
                  { active: id === selectedPost },
                )}
                onClick={() => postHandler(id)}
              >
                {selectedPost === id ? 'Close' : 'Open'}
              </button>
            </li>
          ))
        ) : (
          <p>User have not post</p>
        )
        }
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selectedUser: PropTypes.number.isRequired,
  onChangePost: PropTypes.func.isRequired,
  selectedPost: PropTypes.number.isRequired,
};
