import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';
import { usersPosts } from '../../api/post'; // getUserPosts

export const PostsList = ({ userId }) => {
  const [posts, setPost] = useState([]);
  // const [filteredPosts, setFilteredPosts] = useState([]);

  // console.log(userId);
  useEffect(() => {
    usersPosts()
      .then((post) => {
        setPost(post);
      });
  }, []);

  // useEffect(() => {

  // },[userId])

  // const filterPosts = (userId) => {

  // }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {
          posts.map(post => (
            <li className="PostsList__item">
              <div>
                <b>
                  [User #
                  {post.userId}
                  ]:
                  {' '}
                </b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
              >
                Open
              </button>
            </li>
          ))
        }
        {/* add button close */}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.number.isRequired,
};
