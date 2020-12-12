import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { PropTypes } from 'prop-types';
import { getUserPosts } from '../../api/posts';

export const PostsList = ({ userId, setPostId, postId, setLoader }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(userId).then(res => setPosts(res));
  }, [userId]);

  return (
    <div className="PostsList">

      <h2>{`Posts: ${posts.length}`}</h2>
      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            {postId !== post.id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  setLoader(true);
                  setPostId(post.id);
                  setTimeout(() => setLoader(false), 1000);
                }}
              >
                Open
              </button>
            ) : (
              <button
                type="button"
                className="button"
                onClick={() => setPostId(null)}
              >
                Close
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.string.isRequired,
  postId: PropTypes.number,
  setPostId: PropTypes.func.isRequired,
  setLoader: PropTypes.func.isRequired,
};

PostsList.defaultProps = {
  postId: null,
};
