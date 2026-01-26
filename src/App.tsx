import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList/PostsList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [hasUsersError, setHasUsersError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);

  useEffect(() => {
    setHasUsersError(false);
    setIsLoadingUsers(true);
    client.get<User[]>('/users')
      .then((usersFromServer) => {
        setUsers(usersFromServer)
      })
      .catch(() => {
        setHasUsersError(true);
      })
      .finally(() => {
        setIsLoadingUsers(false);
      })
  }, []);
  
  const selectUser = (person: User) => {
    if (selectedUser?.id === person.id) {
      return;
    } else {
      setSelectedUser(person)
      // setIsSidebarOpen(false);
      setSelectedPost(null);
      // setIsCommentFormOpen(false);
    }
  };
  
  const selectPost = (post: Post) => {
    setSelectedPost(prev =>
      prev?.id === post.id ? null : post
    );

    // setIsCommentFormOpen(false);
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
                  onSelectUser={selectUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isLoadingUsers && <Loader />}

                {!isLoadingUsers && !selectedUser && !hasUsersError && (
                  <p data-cy="NoSelectedUser">No user selected</p>)
                }

                {!isLoadingUsers && hasUsersError && (
                  <div className="notification is-danger" data-cy="UsersError">
                    Something went wrong while loading users
                  </div>
                )}
  
                {!isLoadingUsers && selectedUser && (
                  <PostsList
                    selectedUser={selectedUser}
                    selectedPost={selectedPost}
                    onSelectPost={selectPost}
                  />
                )}
              </div>
            </div>
          </div>

          
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                { 'Sidebar--open': !!selectedPost },
              )}
            >
              <div className="tile is-child box is-success ">
                {selectedPost && (
                  <PostDetails
                    selectedPost={selectedPost}
                  />
                )}
              </div>
            </div>
        </div>
      </div>
    </main>
  );
};
