import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader/Loader';

export const PostsList = ({ changeUser, choosenUser, filterListByUser }) => {
  const [posts, setPosts] = useState([]);
  const [openOrClosePost, setOpenOrClosePost] = useState(false);

  useEffect(() => {
    getUserPosts('', '/posts/').then(post => setPosts([...post]));
  }, []);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.length ? (
          filterListByUser(choosenUser, posts).map(user => (
            <li
              key={user.id}
              className="PostsList__item"
            >
              <div>
                <b>
                  [User #
                  {user.userId}
                  ]:&nbsp;
                </b>
                {user.body}
              </div>
              <button
                onClick={() => {
                  if (openOrClosePost === user.id) {
                    changeUser(0);

                    return setOpenOrClosePost(0);
                  }

                  changeUser(user.id);

                  return setOpenOrClosePost(user.id);
                }}
                type="button"
                className="PostsList__button button"
              >
                {user.id === openOrClosePost ? 'Clear' : 'Open'}
              </button>
            </li>
          ))
        ) : (<Loader />)}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  changeUser: PropTypes.func.isRequired,
  choosenUser: PropTypes.string.isRequired,
  filterListByUser: PropTypes.func.isRequired,
};
