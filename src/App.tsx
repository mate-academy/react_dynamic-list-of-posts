import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detailsSeen, setDetailsSeen] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const getDataFromApi = async (
    pathname: string,
    setData: (value: Post[] | User[] | any) => void,
  ) => {
    try {
      const response = client.get(pathname);
      const result = await response as User[];

      setData(result);

      setIsError(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      throw new Error('An error occured');
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getDataFromApi('/users', setUsers);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const filteredPosts = posts.filter((p: Post) => p.userId === user.id);

    setUserPosts(filteredPosts);
    setIsLoading(false);
  }, [user]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={user}
                  users={users}
                  setUser={setUser}
                  getDataFromApi={getDataFromApi}
                  setPosts={setPosts}
                  setDetailsSeen={setDetailsSeen}
                  setIsLoading={setIsLoading}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {isLoading && <Loader />}
                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {user && userPosts.length === 0 && !isLoading && !isError && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {user && !isError && userPosts.length > 0 && !isLoading && (
                  <PostsList
                    post={post}
                    setPost={setPost}
                    userPosts={userPosts}
                    detailsSeen={detailsSeen}
                    setDetailsSeen={setDetailsSeen}
                    setIsLoadingComments={setIsLoadingComments}
                    setPostComments={setPostComments}
                    setIsError={setIsError}
                  />
                )}
                {!user && !isError && !isLoading && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
              </div>
            </div>
          </div>

          {post && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              {detailsSeen && (
                <div className="tile is-child box is-success ">
                  <PostDetails
                    post={post}
                    comments={comments}
                    setComments={setComments}
                    isLoadingComments={isLoadingComments}
                    postComments={postComments}
                    setPostComments={setPostComments}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
