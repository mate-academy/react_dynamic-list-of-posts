/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSideBarLoading, setIsSideBarLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    setSelectedUser(null);
  }, []);

  const addPosts = (userId: number) => {
    setIsLoading(true);
    setIsError(false);
    setSelectedUser(users.find(user => user.id === userId) || null);

    client
      .get<Post[]>(`/posts?userId=${userId}`)
      .then(fetchedPosts => {
        setPosts(fetchedPosts);
      })
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePostButton = (currentPost: Post) => {
    if (selectedPost?.id === currentPost.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(currentPost);
    }

    setIsFormVisible(false);
    setIsSideBarLoading(true);
    setIsError(false);

    client
      .get<Comment[]>(`/comments?postId=${currentPost.id}`)
      .then(fetchedComments => {
        setComments(fetchedComments);
      })
      .catch(() => setIsError(true))
      .finally(() => {
        setIsSideBarLoading(false);
      });
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  addPosts={addPosts}
                  users={users}
                  setUsers={setUsers}
                  selectedUser={selectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
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

                {selectedUser &&
                  !isLoading &&
                  !isError &&
                  (posts.length === 0 ? (
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
                      handlePostButton={handlePostButton}
                    />
                  ))}
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
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  setComments={setComments}
                  isSideBarLoading={isSideBarLoading}
                  isError={isError}
                  setIsError={setIsError}
                  isFormVisible={isFormVisible}
                  setIsFormVisible={setIsFormVisible}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
