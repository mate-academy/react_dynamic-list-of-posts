import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';

export const PostsList = ({
  userId,
  handleSelectedPost,
  selectedPostId,
}) => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchData() {
      const postsData = await getUserPosts();

      if (userId > 0) {
        setPosts(postsData.filter(post => +post.userId === +userId));
      } else {
        setPosts(postsData);
      }
    }

    fetchData();
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts && posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                {`[User: #${post.userId}] `}
              </b>
              {post.title}
            </div>
            {selectedPostId === post.id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleSelectedPost(0)}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleSelectedPost(post.id)}
              >
                Open
              </button>
            )
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.number,
  handleSelectedPost: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};

PostsList.defaultProps = {
  userId: 0,
};
