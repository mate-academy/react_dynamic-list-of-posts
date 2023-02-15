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

export const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState([]);
  const [post, setPost] = useState<any>(undefined);
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [comments, setComments] = useState<any>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detailsSeen, setDetailsSeen] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [postComments, setPostComments] = useState([]);

  const getDataFromApi = async (
    pathname: string,
    setData: (value: any) => void,
  ) => {
    try {
      const usersResponse = client.get(pathname);
      const usersResult = await usersResponse;

      setData(usersResult);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      throw new Error('An error occured');
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getDataFromApi('/users', setUsers);
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    setUserPosts(posts.filter((p: any) => p.userId === user.id));
  }, [user]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
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
                {user && !isError && userPosts.length > 0 && !isLoading && (
                  <PostsList
                    post={post}
                    setPost={setPost}
                    userPosts={userPosts}
                    detailsSeen={detailsSeen}
                    setDetailsSeen={setDetailsSeen}
                    setIsLoadingComments={setIsLoadingComments}
                    postComments={postComments}
                    setPostComments={setPostComments}
                  />
                )}

                {user && userPosts.length === 0 && !isLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!user && !isError && !isLoading && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
              </div>
            </div>
          </div>

          {post
            && (
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
                {detailsSeen
                  && (
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
