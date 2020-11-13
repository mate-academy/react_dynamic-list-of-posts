import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { Loader } from '../Loader/Loader';
import { getUserPosts } from '../../api/posts';

export function PostsList({ seletedUser, setPostId, selectedPostId }) {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const requestedPosts = await getUserPosts(seletedUser);

      setPosts(requestedPosts);
    }

    fetchData();
    setLoader(false);
  }, [seletedUser]);

  const setButtonStatus = useCallback((postId) => {
    setPostId(current => (
      current === postId
        ? ''
        : postId
    ));
  }, [setPostId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {loader
        ? <Loader />
        : (
          <ul className="PostsList__list">
            {posts.map(post => (
              <li
                className="PostsList__item"
                key={post.id}
              >
                <div>
                  <b>{`[User #${post.userId}]: `}</b>
                  {post.body}
                </div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => setButtonStatus(post.id)}
                >
                  {selectedPostId === post.id ? `Close` : `Open`}
                </button>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}

PostsList.propTypes = {
  seletedUser: PropTypes.number.isRequired,
  setPostId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
