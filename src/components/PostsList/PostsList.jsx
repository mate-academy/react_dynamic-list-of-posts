import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';
import { Post } from '../Post';

export const PostsList = memo(({
  selectedUserId,
  selectedPostId,
  isPostVisible,
  showPost,
}) => {
  const [visiblePosts, setVisiblePosts] = useState([]);

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

      if (selectedUserId === 0) {
        setVisiblePosts(response);

        return;
      }

      const posts = response.filter(({ userId }) => (
        userId === selectedUserId
      ));

      setVisiblePosts(posts);
    }

    fetchData();
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {visiblePosts.map(post => (
          <Post
            key={post.id}
            post={post}
            selectedPostId={selectedPostId}
            isPostVisible={isPostVisible}
            showPost={showPost}
          />
        ))}
      </ul>
    </div>
  );
});

PostsList.propTypes = {
  showPost: PropTypes.func.isRequired,
  isPostVisible: PropTypes.bool.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  userSelectId: PropTypes.number.isRequired,
}.isRequired;
