import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';
import { Loader } from './components/Loader';

const sidebarClass = (value: Post | null) => cn(
  'tile',
  'is-parent',
  'is-8-desktop',
  'Sidebar',
  { 'Sidebar--open': value !== null },
);

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loadPostsError, setLoadPostsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState(false);

  const handleSelectedUser = (value: User) => {
    setSelectedUser(value);
  };

  const handlePost = (value: Post | null) => {
    setPost(value);
  };

  const handleNewComment = (value: boolean) => {
    setNewComment(value);
  };

  useEffect(() => {
    setLoadPostsError(false);

    async function fetchPosts() {
      if (selectedUser) {
        setIsLoading(true);
      }

      try {
        const data = await client.get<Post[]>(`\\posts?userId=${selectedUser?.id}`);

        if (data) {
          setPosts(data);
        }
      } catch (error) {
        setLoadPostsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  handleSelectedUser={handleSelectedUser}
                  handlePost={handlePost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                ) }

                {isLoading ? (<Loader />) : (
                  <>
                    { selectedUser && loadPostsError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    ) }

                    { selectedUser && posts?.length === 0
                    && !loadPostsError && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    ) }

                    { selectedUser && posts && posts?.length > 0 && (
                      <PostsList
                        posts={posts}
                        handlePost={handlePost}
                        post={post}
                        handleNewComment={handleNewComment}
                      />
                    )}
                  </>
                )}

              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={sidebarClass(post)}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                post={post}
                newComment={newComment}
                handleNewComment={handleNewComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
