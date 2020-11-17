import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { Loader } from '../Loader';
import { getUserPosts } from '../../api/posts';

export function PostsList({ selectedUser, setSelectedPostId, selectedPostId }) {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      const requestedPosts = await getUserPosts(selectedUser);

      setPosts(requestedPosts);
    };

    fetchData();
    setLoader(false);
  }, [selectedUser]);

  const buttonStatus = (postId) => {
    setSelectedPostId((current) => {
      if (current === postId) {
        return '';
      }

      return postId;
    });
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {loader
        ? <Loader />
        : (
          <ul className="PostsList__list">
            {posts.map(post => (
              <li className="PostsList__item" key={post.id}>
                <div>
                  <b>
                    {`[User #${post.userId}]:`}
                  </b>
                  {post.body}
                </div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => buttonStatus(post.id)}
                >
                  {selectedPostId !== post.id ? 'Open' : 'Close'}
                </button>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}

PostsList.propTypes = {
  selectedUser: PropTypes.number.isRequired,
  setSelectedPostId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
