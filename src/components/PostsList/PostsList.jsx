import React, { useState } from 'react';
import PropTypes, { shape } from 'prop-types';
import { getPostDetails } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({ posts, onChangePost }) => {
  const [currentPostId, setCurrentPostId] = useState(0);

  const changeSelectedPost = async(id) => {
    const post = await getPostDetails(id);

    onChangePost(post);
    setCurrentPostId(id);
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
              onClick={
                currentPostId === post.id
                  ? () => changeSelectedPost(0)
                  : () => changeSelectedPost(post.id)
              }
            >
              {currentPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  onChangePost: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
