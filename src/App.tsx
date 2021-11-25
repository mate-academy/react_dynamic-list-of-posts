/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPost, getPostsByUserId } from './api/posts';
import { getUsers } from './api/users';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    async function loadData() {
      if (!selectedUserId) {
        const [allUsers, allPosts] = await Promise.all([
          getUsers(),
          getAllPost(),
        ]);

        const usersWithPosts = allUsers.filter((user: User) => allPosts
          .find((post: Post) => post.userId === user.id));

        console.log('UseEffect', usersWithPosts);
        console.log('UseEffect', allPosts);

        setPosts(allPosts);
        setUsers(usersWithPosts);
      } else {
        const userPosts = await getPostsByUserId(selectedUserId);

        setPosts(userPosts);
      }
    }

    loadData();
  }, [selectedUserId]);

  const togglePostDetails = (postId: number) => {
    setSelectedPostId(postId);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedUserId(Number(value));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="selectedUser">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="selectedUser"
            value={selectedUserId}
            onChange={handleSelectChange}
          >
            <option value="0">All users</option>

            {users.length && users.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
            {/* <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option> */}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            onTogglePostDetails={togglePostDetails}
          />
        </div>

        <div className="App__content">
          <PostDetails />
        </div>
      </main>
    </div>
  );
};
