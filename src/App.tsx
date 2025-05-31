import cn from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[] | []>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [isOpenCommentForm, setIsOpenCommentForm] = useState(false);

  useEffect(() => {
    client.get<User[]>('/users').then(setUsers);
  }, []);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);

    setIsLoading(true);
    setHasError(false);

    client
      .get<Post[]>(`/posts?userId=${user.id}`)
      .then(setPosts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  const handlePostSelect = (post: Post) => {
    if (post.id === selectedPost?.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post);
    setIsOpenCommentForm(false);
  };

  const hasPostDetails =
    selectedPost?.userId === selectedUser?.id &&
    selectedPost?.userId !== undefined;

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
                  onUserSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts?.length === 0 && !isLoading && !hasError && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts && posts.length >= 1 && !isLoading && !hasError && (
                  <PostsList
                    selectedPost={selectedPost}
                    onPostSelect={handlePostSelect}
                    posts={posts}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': hasPostDetails,
            })}
          >
            <div className="tile is-child box is-success ">
              {hasPostDetails && (
                <PostDetails
                  selectedPost={selectedPost}
                  isOpenCommentForm={isOpenCommentForm}
                  onCommentFormOpen={() => setIsOpenCommentForm(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
