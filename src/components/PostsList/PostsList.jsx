import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';
import './PostsList.scss';

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
              <li className="PostsList__item" key={post.id}>
                <div>
                  <b>
                    {`[User #${post.userId}]:`}
                  </b>
                  {post.title}
                </div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => choosePost(post.id)}
                >
                  {selectedPostId === post.id
                    ? 'Close'
                    : 'Open'
                  }
                </button>
              </li>
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
