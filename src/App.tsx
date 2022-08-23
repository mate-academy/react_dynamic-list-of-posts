import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import {
  getPostDetails,
  getPosts,
  getUserPosts,
  getUsers,
} from './api/posts';
import { Post } from './types/Post';
import { User } from './types/User';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectPostDetails, setSelectPostDetails] = useState<Post | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [isLoadingDetails, setIsloadingDetails] = useState<boolean>(true);

  useEffect(() => {
    const showPosts = async () => {
      const showAllPosts = await getPosts();

      setIsloading(false);
      setPosts(showAllPosts);
    };

    showPosts();

    const showUsers = async () => {
      const showAllUsers = await getUsers();

      setUsers(showAllUsers);
    };

    showUsers();
  }, []);

  const filterPosts = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsloading(true);
    let showAllUserPosts;

    if (+event.target.value === 0) {
      showAllUserPosts = await getPosts();
    } else {
      showAllUserPosts = await getUserPosts(+event.target.value);
    }

    setIsloading(false);
    setPosts(showAllUserPosts);
  };

  const selectPostId = async (postId: number) => {
    setIsloadingDetails(true);

    if (selectedPostId === postId) {
      setSelectedPostId(null);
    } else {
      setSelectedPostId(postId);
    }

    const selectedPost = await getPostDetails(postId);

    setIsloadingDetails(false);
    setSelectPostDetails(selectedPost);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector" onChange={filterPosts}>
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {isLoading
            ? <Loader />
            : (
              <PostsList
                posts={posts}
                selectPostId={selectPostId}
                selectedPostId={selectedPostId}
              />
            )}
        </div>

        {selectedPostId && (
          <div className="App__content">
            {isLoadingDetails
              ? <Loader />
              : (
                <PostDetails
                  selectPostDetails={selectPostDetails}
                  selectedPostId={selectedPostId}
                />
              )}
          </div>
        )}
      </main>
    </div>
  );
};
