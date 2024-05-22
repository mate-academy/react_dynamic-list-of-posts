import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/bulma.sass';
import './App.scss';

import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { getUsers } from './api/getUser';
import { getUserPosts } from './api/getUserPosts';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Post } from './types/Post';
import { User } from './types/User';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isErrorOnLoadUsers, setIsErrorOnLoadUsers] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isAddingNewComment, setIsAddingNewComment] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();

        setUsers(fetchedUsers);
      } catch (error) {
        setIsErrorOnLoadUsers(true);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (selectedUser) {
        setIsLoading(true);
        try {
          const fetchedPosts = await getUserPosts(selectedUser?.id);

          setPosts(fetchedPosts);
        } catch (error) {
          setIsErrorOnLoadUsers(true);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserPosts();
  }, [selectedUser]);

  const handleSelectedPost = (post: Post) => {
    setSelectedPost(selectedPost?.id === post.id ? null : post);
    setIsAddingNewComment(false);
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
                  setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {isErrorOnLoadUsers && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {posts?.length === 0 && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {posts && posts.length > 0 && (
                      <PostsList
                        posts={posts}
                        selectedPost={selectedPost}
                        handleSelectedPost={handleSelectedPost}
                      />
                    )}
                  </>
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
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost}
                  isAddingNewComment={isAddingNewComment}
                  setIsAddingNewComment={setIsAddingNewComment}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
