import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/api';
import './PostsList.scss';
import { Loader } from '../Loader/Loader';
import { Post } from '../Post/Post';

export const PostsList = ({ selectedUser, selectedUSerId, selectedPost, resetUSer }) => {
  const [users, setUsers] = useState([]);
  const [isPrepered, setISPrepered] = useState(false);

  useEffect(() => {
    setISPrepered(true);

    (async() => {
      const data = await getUserPosts();

      if (selectedUser) {
        setUsers(data.filter(post => selectedUser === post.id));

        setISPrepered(false);

        return;
      }

      setUsers(data);
      setISPrepered(false);
    })();
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
              selectedUSerId={selectedUSerId}
              selectedPost={selectedPost}
              resetUSer={resetUSer}
            />
          ))}
        </ul>
      </div>
    );
};
