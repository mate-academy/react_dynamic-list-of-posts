import cn from 'classnames';
import React, { useState, useEffect, useCallback } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import UserSelector from './components/UserSelector';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);


  useEffect(() => {
    client.get<User[]>('/users')
      .then(setUsers)
      .catch((err) => {
        console.error('Failed to fetch users:', err);
      });
  }, []);


  const handleChooseUser = useCallback((userId: number, userName: string) => {
    setSelectedUser(userName);
    setSelectedUserId(userId);
    setSelectedPost(null);
  }, []);


  useEffect(() => {
    const fetchPosts = async () => {
      if (selectedUserId) {
        setIsLoadingPosts(true);
        setError(null);

        try {
          const data = await client.get<Post[]>(`/posts?userId=${selectedUserId}`);
          setPosts(data);
        } catch (err) {
          setError('Failed to load posts');
          console.error('Failed to load posts:', err);
        } finally {
          setIsLoadingPosts(false);
        }
      }
    };

    fetchPosts();
  }, [selectedUserId]);


  const handleOpenPost = useCallback((post: Post | null) => {
    setSelectedPost(post);
  }, []);


  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} handleChooseUser={handleChooseUser} selectedUser={selectedUser} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {error && (
                  <div className="notification is-danger" data-cy="PostsLoadingError">
                    Something went wrong!
                  </div>
                )}
                {!isLoadingPosts && posts.length === 0 && !error && selectedUser && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {!isLoadingPosts && posts.length > 0 && (
                  <PostsList posts={posts} handleOpenPost={handleOpenPost} selectedPostId={selectedPost?.id} />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
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
              {selectedPost && <PostDetails selectedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
};
