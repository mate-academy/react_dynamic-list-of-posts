import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';

export const PostsList = ({ selectPost, selectedUser }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const postList = await getUserPosts(selectedUser);

      setPosts(postList);
    }

    fetchData();
  }, [selectedUser]);

  const showDetails = (id) => {
    selectPost(id);
    setSelectedPostId(id);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            key={`${post.id}`}
            className="PostsList__item"
          >
            <div>
              <b>{`[User #${post.userId || ''}]: `}</b>
              {`${post.title || ''}`}
            </div>
            <button
              type="button"
              data-id={post.id}
              className={classnames(
                'PostsList__button button',
                { 'button--selected': (selectedPostId === post.id) },
              )}
              onClick={
                () => showDetails(
                  selectedPostId === post.id ? undefined : post.id,
                )
              }
            >
              {(selectedPostId === post.id) ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selectPost: PropTypes.func.isRequired,
  selectedUser: PropTypes.number.isRequired,
};
