import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';

export const PostsList = ({ selectUserId, selectedPostId }) => {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(0);

  const showPostDetails = (selectPostId) => {
    selectedPostId(true, selectPostId);

    setPostId(selectPostId);
  };

  const hidePostDetails = () => {
    selectedPostId(false, 0);

    setPostId(0);
  };

  useEffect(() => {
    getUserPosts(selectUserId)
      .then(setPosts);
  }, [selectUserId]);

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
                { `[User #${post.userId}]:` }
              </b>
              {post.title}
            </div>

            {(postId !== post.id)
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={event => showPostDetails(post.id)}
                >
                  Open
                </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={hidePostDetails}
                >
                  Close
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
  selectUserId: PropTypes.number.isRequired,
  selectedPostId: PropTypes.func.isRequired,
};
