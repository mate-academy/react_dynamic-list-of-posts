import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/post';
import { getPosts, getUserPosts, getUsers } from './api/api';
import { Loader } from './components/Loader';
import { User } from './types/user';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  const loadUsers = () => {
    getUsers().then(usersFromServer => {
      if (!('Error' in usersFromServer)) {
        setUsers(usersFromServer);
      }
    });
  };

  const loadPosts = async () => {
    setIsLoadingPosts(true);

    // users.forEach(user => {
    //   getUserPosts(user.id).then(res => {
    //     if (!('Error' in res)) {
    //       res.forEach((element: Post) => {
    //         setPosts(prew => [...prew, element]);
    //       });
    //     }
    //   });
    // });

    await getPosts().then((postsFromServer) => {
      if (!('Error' in postsFromServer)) {
        setPosts(postsFromServer);
      }
    });

    setIsLoadingPosts(false);
  };

  const loadUserPosts = async (id: number) => {
    setIsLoadingPosts(true);

    await getUserPosts(id).then(userPostsFromServer => {
      if (!('Error' in userPostsFromServer)) {
        setPosts(userPostsFromServer);
      }
    });

    setIsLoadingPosts(false);
  };

  useEffect(() => {
    loadUsers();
    loadPosts();
  }, []);

  useEffect(() => {
    if (selectedUserId > 0) {
      loadUserPosts(selectedUserId);
    } else {
      loadPosts();
    }
  }, [selectedUserId]);

  useEffect(() => {
    // if (selectedPostId > 0) {

    // }
  }, [selectedPostId]);

  const handleSelectPost = (id: number) => {
    setSelectedPostId(id);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => setSelectedUserId(+event.target.value)}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {isLoadingPosts
            ? <Loader />
            : (
              <PostsList
                posts={posts}
                onSelectPost={handleSelectPost}
                selectedPostId={selectedPostId}
              />
            )}
        </div>
        {selectedPostId > 0 && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
