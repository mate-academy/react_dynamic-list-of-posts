import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';
import { Post } from '../Post';
import './PostsList.scss';

export const PostsList = ({ selectedUserId, selectPostId, selectedPostId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, [selectedUserId]);

  const loadPosts = async() => {
    const postsFromServer = await getUserPosts(selectedUserId);

    setPosts(postsFromServer);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <Post
            key={post.id}
            {...post}
            selectedPostId={selectedPostId}
            selectPostId={selectPostId}
          />
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  selectPostId: PropTypes.func.isRequired,
};
