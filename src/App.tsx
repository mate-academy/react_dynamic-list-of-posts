import { useCallback, useState } from 'react';
import * as postsService from './api/posts';

import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Sidebar } from './components/Sidebar';

import { Post } from './types/Post';
import { User } from './types/User';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

export const App = () => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActiveListUsers, setIsActiveListUsers] = useState(false);

  const getPostsByUser = useCallback(async (userId: number) => {
    setIsLoading(true);
    try {
      const postsUser = await postsService.getPosts(userId);

      setSelectedPost(null);
      setUserPosts(postsUser);
    } catch (error) {
      setIsError(true);
      setUserPosts([]);
    } finally {
      setIsLoading(false);
      setSelectedPost(null);
    }
  }, []);

  const isShowMessageAboutNotPosts =
    !userPosts.length && !isLoading && !isError && activeUser;

  return (
    <main className="section" onClick={() => setIsActiveListUsers(false)}>
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setIsError={setIsError}
                  getPostsByUser={getPostsByUser}
                  isActive={isActiveListUsers}
                  setIsActive={setIsActiveListUsers}
                  setUserPosts={setUserPosts}
                  activeUser={activeUser}
                  setActiveUser={setActiveUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!isLoading && !activeUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isShowMessageAboutNotPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!userPosts.length && (
                  <PostsList
                    userPosts={userPosts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <Sidebar selectedPost={selectedPost} />
        </div>
      </div>
    </main>
  );
};
