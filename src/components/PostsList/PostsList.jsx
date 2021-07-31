import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';

export const PostsList = ({ changeUser }) => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // getUserPosts('1', '/users/').then(a => console.log(a));
    // getUserPosts('', '/posts/').then(a => console.log(a));
  }, []);

  getUserPosts('', '/posts/').then(a => setPosts([...a]));

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(user => (
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
                if (open === user.id) {
                  changeUser(0);

                  return setOpen(0);
                }

                changeUser(user.id);

                return setOpen(user.id);
              }}
              type="button"
              className="PostsList__button button"
            >
              {user.id === open ? 'Clear' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  changeUser: PropTypes.func.isRequired,
};
