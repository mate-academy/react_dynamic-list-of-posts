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
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChoosePost = (choosePost: Post) => {
    if (choosePost.id === post?.id) {
      setPost(null);

      return;
    }

    setPost(choosePost);
  };

  useEffect(() => {
    setComments([]);
    if (post) {
      (async () => {
        try {
          setIsCommentsLoading(true);
          const commentsData = await getComments(post.id);

          setComments(prevComments => [...prevComments, ...commentsData]);
        } catch {
          setIsError(true);
          warningTimer(setIsError, false, 3000);
        } finally {
          setIsCommentsLoading(false);
        }
      })();
    }
  }, [post]);

  useEffect(() => {
    setPost(null);
    if (user) {
      (async () => {
        try {
          setIsLoading(true);
          const postsData = await getPosts(user.id);

          setPosts(postsData);
        } catch {
          setIsError(true);
          warningTimer(setIsError, false, 3000);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      try {
        const usersData = await getUsers();

        setUsers(usersData);
      } catch {
        setIsError(true);
        warningTimer(setIsError, false, 3000);
      }
    })();
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
                  onSetUser={setUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!user && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
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

                {!isError && user && !isLoading && (!posts.length ? (
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
                ))}
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
                  isLoaderComments={isCommentsLoading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
