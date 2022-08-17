import React, { useEffect, useState } from 'react';
import { getPosts } from '../../api/posts';

type Props = {
  setPosts: (posts: Post[]) => void;
};

export const UserSelect: React.FC<Props> = ({ setPosts }) => {
  const [selectedUser, setSelectedUser] = useState(0);

  const loadPosts = async () => {
    const posts = await getPosts(selectedUser);

    setPosts(posts);
  };

  useEffect(() => {
    loadPosts();
  }, [selectedUser]);

  const handleChangeUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+e.currentTarget.value);
  };

  return (
    <label htmlFor="users">
      Select a user: &nbsp;

      <select
        className="App__user-selector"
        id="users"
        value={selectedUser}
        onChange={handleChangeUser}
      >
        <option value="0">All users</option>
        <option value="1">Leanne Graham</option>
        <option value="2">Ervin Howell</option>
        <option value="3">Clementine Bauch</option>
        <option value="4">Patricia Lebsack</option>
        <option value="5">Chelsey Dietrich</option>
        <option value="6">Mrs. Dennis Schulist</option>
        <option value="7">Kurtis Weissnat</option>
        <option value="8">Nicholas Runolfsdottir V</option>
        <option value="9">Glenna Reichert</option>
        <option value="10">Leanne Graham</option>
      </select>
    </label>
  );
};
