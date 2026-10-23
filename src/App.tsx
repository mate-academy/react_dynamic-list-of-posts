import { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { isApiError } from './utils/isApiError';

export const App = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [selectUser, setSelectUser] = useState<number | null>(null);
  const [postList, setPostList] = useState<Post[]>([]);
  const [selectPost, setSelectPost] = useState<number | null>(null);
  const selectedPost = postList.find(post => post.id === selectPost);
  const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false);
  const [hasPostsError, setHasPostsError] = useState<boolean>(false);

  const isPostsLoaded =
    selectUser !== null && !isPostsLoading && !hasPostsError;

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await client.get<User[]>('/users');

        if (isApiError(data)) {
          throw new Error(data.error);
        }

        setUserList(data);
      } catch {
        alert('Load Users Unsuccessfull!');
      }
    }

    loadUsers();
  }, []);

  useEffect(() => {
    setHasPostsError(false);
    async function loadPosts() {
      if (!selectUser) {
        return;
      }

      setIsPostsLoading(true);

      try {
        const data = await client.get<Post[]>(`/posts?userId=${selectUser}`);

        if (isApiError(data)) {
          throw new Error(data.error);
        }

        setPostList(data);
      } catch {
        setHasPostsError(true);
      } finally {
        setIsPostsLoading(false);
      }
    }

    loadPosts();
  }, [selectUser]);

  function handleSelectPost(id: number) {
    setSelectPost(current => (current === id ? null : id));
  }

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={userList}
                  onSelectUser={setSelectUser}
                  activeUser={selectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectUser === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostsLoading && <Loader />}

                {hasPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {postList.length === 0 && isPostsLoaded && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {postList.length > 0 && isPostsLoaded && (
                  <PostsList
                    posts={postList}
                    selectedPostId={selectPost}
                    onSelectPost={handleSelectPost}
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
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails key={selectedPost.id} activePost={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
