import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPosts, getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({
  userId,
  setPostId,
}) => {
  const [posts, setPosts] = useState([]);
  // const [selectedPostId, setSelectedPostId] = useState('');

  // useEffect(() => {
  //   console.log(userId);
  //   getUserPosts(userId)
  //     .then(posts => setPosts(posts));
  // })

  useEffect(() => {
    if (!userId) {
      // console.log(false);
      getPosts()
        .then(setPosts);
    } else {
      // console.log(true);
      getUserPosts(userId)
        .then(setPosts);
    }
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                [User
                {post.name}
                ]:
                {' '}
              </b>
              {post.body}
            </div>
            <button
              type="button"
              className="PostsList__button button"
            >
              Close
            </button>
          </li>
        ))}

        {/* <li className="PostsList__item">
          <div>
            <b>[User #2]: </b>
            et ea vero quia laudantium autem
          </div>

          <button
            type="button"
            className="PostsList__button button"
          >
            Open
          </button>
        </li> */}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.number.isRequired,
  setPostId: PropTypes.func.isRequired,
};
