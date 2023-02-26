import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { getComments } from './api/comments';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { warningTimer } from './utils/warningTimer';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isLoaderComments, setIsLoaderComments] = useState(false);
  const [isHasError, setIsHasError] = useState(false);

  const handleChooseUser = (chooseUser: User) => {
    setUser(chooseUser);
  };

  const handleChoosePost = (choosePost: Post) => {
    if (choosePost.id === post?.id) {
      setPost(null);
    }

    setPost(choosePost);
  };

  useEffect(() => {
    setComments([]);
    if (post) {
      const onLoadGetComments = async () => {
        try {
          setIsLoaderComments(true);
          const commentsData = await getComments(post.id);

          setComments(prevComments => [...prevComments, ...commentsData]);
        } catch (error) {
          setIsHasError(true);
          warningTimer(setIsHasError, false, 3000);
        } finally {
          setIsLoaderComments(false);
        }
      };

      onLoadGetComments();
    }
  }, [post]);

  useEffect(() => {
    if (user) {
      const onLoadGetPosts = async () => {
        try {
          setIsLoader(true);
          const postsData = await getPosts(user.id);

          setPosts(postsData);
        } catch (error) {
          setIsHasError(true);
          warningTimer(setIsHasError, false, 3000);
        } finally {
          setIsLoader(false);
        }
      };

      onLoadGetPosts();
    }
  }, [user]);

  useEffect(() => {
    const onLoadGetUsers = async () => {
      try {
        const usersData = await getUsers();

        setUsers(usersData);
      } catch (error) {
        setIsHasError(true);
        warningTimer(setIsHasError, false, 3000);
      }
    };

    onLoadGetUsers();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  user={user}
                  handleChooseUser={handleChooseUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!user && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoader && <Loader />}

                {isHasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isHasError && user && !isLoader && (
                  <>
                    {!posts.length ? (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    ) : (
                      <PostsList
                        posts={posts}
                        openPost={post}
                        handleChoosePost={handleChoosePost}
                      />
                    )}
                  </>
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
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={post}
                  comments={comments}
                  setComments={setComments}
                  isLoaderComments={isLoaderComments}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
