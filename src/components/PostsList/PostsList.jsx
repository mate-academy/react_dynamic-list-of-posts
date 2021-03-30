import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/api';
import './PostsList.scss';
import { Loader } from '../Loader/Loader';
import { Post } from '../Post/Post';

export const PostsList = ({
  selectedUser,
  selectedUserId,
  selectedPost,
  resetUser,
}) => {
  const [users, setUsers] = useState([]);
  const [isPrepered, setIsPrepered] = useState(false);

  useEffect(() => {
    setIsPrepered(true);

    const postUser = async() => {
      const data = await getUserPosts();

      if (selectedUser) {
        setUsers(data.filter(post => selectedUser === post.id));

        setIsPrepered(false);

        return;
      }

      setUsers(data);
      setIsPrepered(false);
    };

    postUser();
  });

  return !isPrepered
    ? (<Loader />)
    : (
      <div className="PostsList">
        <h2>Posts:</h2>

        <ul className="PostsList__list">
          {users.map(user => (
            <Post
              key={user.id}
              id={user.id}
              title={user.title}
              userId={user.userId}
              selectedUserId={selectedUserId}
              selectedPost={selectedPost}
              resetUser={resetUser}
            />
          ))}
        </ul>
      </div>
    );
};

PostsList.propTypes = {
  selectedUser: PropTypes.number.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectedPost: PropTypes.number.isRequired,
  resetUser: PropTypes.func.isRequired,
};
