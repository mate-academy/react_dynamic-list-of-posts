import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';
import './PostsList.scss';
import { Post } from '../Post/Post';

export const PostsList = ({ selectedUserId, choosePost, selectedPostId }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, toggleLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, [selectedUserId]);

  const loadUsers = async() => {
    const postsFromServer = await getUserPosts(selectedUserId);

    setPosts(postsFromServer);
    toggleLoading(false);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {isLoading
        ? <Loader />
        : (
          <ul>
            {posts.map(post => (
              <Post
                post={post}
                choosePost={choosePost}
                selectedPostId={selectedPostId}
              />
            ))}
          </ul>
        )}
    </div>
  );
};

PostsList.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  choosePost: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
