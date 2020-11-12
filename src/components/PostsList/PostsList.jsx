import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { PropTypes } from 'prop-types';
import { Post } from '../Post';

const PostsList = ({ posts, selectedUserId, onActivePostChange }) => {
  const [selectedPosts, setSelectedPost] = useState(posts);
  const [activeId, setActiveId] = useState(0);

  useEffect(() => {
    const updatedPosts = posts.filter(post => (
      selectedUserId === 0 || selectedUserId === post.userId
    ));

    setSelectedPost(updatedPosts);
  }, [selectedUserId]);

  const selectPost = (id) => {
    if (id !== activeId) {
      setActiveId(id);
      onActivePostChange(id);
    } else {
      setActiveId(0);
      onActivePostChange(0);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        { selectedPosts.map(post => (
          <Post
            key={post.id}
            userId={post.userId}
            title={post.title}
            isActive={post.id === activeId}
            onPostSelect={() => selectPost(post.id)}
          />
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  onActivePostChange: PropTypes.func.isRequired,
};

export { PostsList };
