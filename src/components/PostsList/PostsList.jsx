import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({ selectedUserId, choosePost, selectedPostId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function inner() {
      const postsFromServer = await getUserPosts();

      setPosts(postsFromServer);
    }

    inner();
  }, []);

  useEffect(() => {
    async function inner() {
      const postsFromServer = await getUserPosts(selectedUserId);

      setPosts(postsFromServer);
    }

    inner();
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

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
    </div>
  );
};

PostsList.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  choosePost: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
