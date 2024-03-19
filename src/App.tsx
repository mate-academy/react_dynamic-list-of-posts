import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { getUsers } from './api/users';
import { User } from './types/User';
import { Loader } from './components/Loader';
import { getPosts } from './api/posts';
import { Post } from './types/Post';
import { getComments } from './api/comments';
import { Error, Loading } from './types/Helpers';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post>({
    id: 0,
    userId: 0,
    title: '',
    body: '',
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFormShown, setIsFormShown] = useState(false);
  const [loading, setLoading] = useState<Loading>(null);
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();

      setUsers(fetchedUsers);
      setError(null);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser.id) {
      setLoading('Posts');
    }

    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts(selectedUser.id);

        setPosts(fetchedPosts);
        setError(null);
      } catch {
        setError('Posts');
      } finally {
        setLoading(null);
      }
    };

    fetchPosts();
  }, [selectedUser]);

  useEffect(() => {
    if (selectedPost.id) {
      setLoading('Comments');
    }

    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments(selectedPost.id);

        setComments(fetchedComments);
        setError(null);
      } catch {
        setError('Comments');
      } finally {
        setLoading(null);
      }
    };

    fetchComments();
  }, [selectedPost]);

  useEffect(() => setIsFormShown(false), [selectedUser, selectedPost]);

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
                  setSelectedUser={setSelectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser.id && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading === 'Posts' && <Loader />}

                {error === 'Posts' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!!selectedUser.id &&
                  error !== 'Posts' &&
                  loading !== 'Posts' &&
                  (!posts?.length ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      posts={posts}
                      selectedPost={selectedPost}
                      setSelectedPost={setSelectedPost}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': !!selectedPost.id && loading !== 'Posts',
            })}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                selectedPost={selectedPost}
                comments={comments}
                setComments={setComments}
                isFormShown={isFormShown}
                setIsFormShown={setIsFormShown}
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
