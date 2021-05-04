import React from 'react';
import PropTypes from 'prop-types';
import { PostType } from '../../Types';
import { getPostDetails } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({
  userPosts,
  setSelectedPostId,
  selectedPostId,
  setIsPostSelected,
  isPostSelected,
  setSelectedPost,
}) => {
  const handleButton = (postId) => {
    if (postId !== selectedPostId) {
      setIsPostSelected(true);
      setSelectedPostId(postId);
      getPostDetails(postId)
        .then(selectedPost => setSelectedPost(selectedPost));
    } else {
      setIsPostSelected(false);
      setSelectedPostId(0);
      setSelectedPost(null);
    }
  };

  return (
    <div className="PostsList">
      <h2>
        Posts:
        {userPosts.length}
      </h2>

      <ul className="PostsList__list">
        {userPosts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>{`[User ${post.userId || 'not defined'}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleButton(post.id)}
            >
              {selectedPostId === post.id && isPostSelected
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
  userPosts: PropTypes.arrayOf(
    PropTypes.shape(PostType),
  ).isRequired,
  setSelectedPostId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  setIsPostSelected: PropTypes.func.isRequired,
  isPostSelected: PropTypes.bool.isRequired,
  setSelectedPost: PropTypes.func.isRequired,
};
