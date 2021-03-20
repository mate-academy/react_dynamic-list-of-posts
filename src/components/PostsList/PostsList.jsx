import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Post } from '../Post';
import { getUserPosts } from '../../api/posts';

import './PostsList.scss';

export const PostsList = ({
  selectedUser,
  onChangeUserId,
  selectedPostId,
  onResetUserId,
}) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    (async() => {
      const data = await getUserPosts();

      if (selectedUser) {
        setUsers(data.filter(post => selectedUser === post.userId));
        setIsLoading(false);

        return;
      }

      setUsers(data);
      setIsLoading(false);
    })();
  }, [selectedUser]);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {users.length && users.map(user => (
          <Post
            key={user.id}
            id={user.id}
            title={user.title}
            userId={user.userId}
            onChangeUserId={onChangeUserId}
            selectedPostId={selectedPostId}
            onResetUserId={onResetUserId}
          />
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
  selectedUser: PropTypes.number.isRequired,
  onChangeUserId: PropTypes.func.isRequired,
  onResetUserId: PropTypes.func.isRequired,
};
