import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';

export const PostsList = ({
  userSelectId,
  selectedPostId,
  setSelectedPostId,
  statusPost,
  setStatusPost,
}) => {
  const [visiblePosts, setVisiblePosts] = useState([]);

  const handlePostId = (event) => {
    setSelectedPostId(Number(event.target.value));
    setStatusPost(!statusPost);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getUserPosts();

      setVisiblePosts(response);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await getUserPosts();

      if (userSelectId === 0) {
        setVisiblePosts(response);

        return;
      }

      const posts = response.filter(({ userId }) => (
        userId === userSelectId
      ));

      setVisiblePosts(posts);
    }

    fetchData();
  }, [userSelectId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {visiblePosts.map(post => (
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
              onClick={handlePostId}
              value={post.id}
            >
              {selectedPostId === post.id && statusPost
                ? 'Close'
                : 'Open'
              }
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  changePostId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  userSelectId: PropTypes.number.isRequired,
}.isRequired;
