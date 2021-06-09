import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getUserPosts } from '../../api/message';

import './PostsList.scss';

export const PostsList = ({ selectedUser, setPostId }) => {
  const [userPosts, setUserPosts] = useState();
  const [postIsSelected, setSelectedPost] = useState(false);

  useEffect(() => {
    getUserPosts()
      .then((result) => {
        setUserPosts(result.data);
      });
  }, []);

  useEffect(() => {
    getUserPosts()
      .then((result) => {
        setUserPosts(() => {
          if (+selectedUser === 0) {
            return result.data;
          }

          return result.data.filter(post => post.userId === +selectedUser);
        });
      });
  }, [selectedUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {userPosts
        && (
        <ul className="PostsList__list">
          {userPosts.map(user => (
            <li className="PostsList__item" key={user.id}>
              <div>
                <b>
                  {`[User # ${user.userId}]: `}
                </b>
                {user.title}
              </div>
              {user.id === postIsSelected ? (
                <button
                  type="button"
                  className="PostsList__button button PostsList__button--active"
                  onClick={() => {
                    setSelectedPost(null);
                    setPostId(null);
                  }}
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    setSelectedPost(user.id);
                    setPostId(user.id);
                  }}
                >
                  Open
                </button>
              )}
            </li>
          ))}
        </ul>
        )
      }
    </div>
  );
};

PostsList.propTypes = {
  selectedUser: PropTypes.string.isRequired,
  setPostId: PropTypes.func.isRequired,
};
