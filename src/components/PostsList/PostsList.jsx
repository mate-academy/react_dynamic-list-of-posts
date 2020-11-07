import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';
import './PostsList.scss';

export const PostsList = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPosts();
  }, [userId]);

  const loadPosts = async() => {
    setLoading(true);
    const postsFromServer = await getUserPosts(userId);

    setPosts(postsFromServer);
    setLoading(false);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {loading
          ? (<Loader />)
          : (
            posts.map(post => (
              <li
                key={post.id}
                className="PostsList__item"
              >
                <div>
                  <b>{`[User #${post.userId}]: `}</b>
                  {post.title}
                </div>

                <button
                  type="button"
                  className="PostsList__button button"
                >
                  Close
                </button>
              </li>
            ))
          )

        }
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.number.isRequired,
};
