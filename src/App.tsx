import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState, SetStateAction } from 'react';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';
import { User } from './types/User';
import { ErrorMessage } from './types/error';

export const App = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const [state, setState] = useState({
    posts: [] as Post[],
    selectedUser: null as User | null,
    isLoading: false,
    selectedPost: null as Post | null,
  });

  const { posts, selectedUser, isLoading, selectedPost } = state;

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => {
        setErrorMessage(ErrorMessage.POSTS_LOAD_ERROR);
      });
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    client
      .get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(response => {
        setState(prev => ({
          ...prev,
          posts: response,
        }));
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.POSTS_LOAD_ERROR);
      })
      .finally(() => {
        setState(prev => ({
          ...prev,
          isLoading: false,
        }));
      });
  }, [selectedUser]);

  const handleSelectUser = (user: User) => {
    setState({
      posts: [],
      selectedUser: user,
      isLoading: true,
      selectedPost: null,
    });
  };
  //

  const setSelectedPost = (post: SetStateAction<Post | null>) => {
    setState(prev => ({
      ...prev,
      selectedPost: typeof post === 'function' ? post(prev.selectedPost) : post,
    }));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  handleSelectUser={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser === null ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : isLoading ? (
                  <Loader />
                ) : posts.length === 0 && !errorMessage ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    {ErrorMessage.NO_POSTS}
                  </div>
                ) : (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                  />
                )}
              </div>

              {errorMessage && (
                <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                >
                  {ErrorMessage.POSTS_LOAD_ERROR}
                </div>
              )}
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': selectedPost !== null,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                selectedPost={selectedPost}
                setErrorMessage={setErrorMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// comment
