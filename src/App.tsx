import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './Api/Users';
import { getPosts } from './Api/Posts';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { createComments, deleteComments, getComments } from './Api/Comment';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post>();

  const [error, setError] = useState(false);
  const [errorComments, setErrorComments] = useState(false);

  const [isUserSelected, setIsUserSelected] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);

  async function fetchCreateComment({
    name,
    email,
    body,
    postId,
  }: Omit<Comment, 'id'>) {
    try {
      const result = await createComments({ name, email, body, postId });

      setComments(currentComments => [...currentComments, result]);
    } catch (errorCreatComments) {
      throw errorCreatComments;
    }
  }

  async function fetchPosts(userId: number) {
    setIsLoading(true);
    setError(false);
    setIsUserSelected(!!userId);

    if (userId !== selectedUserId) {
      setIsSidebarOpen(false);
      setSelectedUserId(userId);
    }

    try {
      const results = await getPosts(userId);

      setPosts(results);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchComments(postId: number) {
    setIsLoadingComments(true);
    setErrorComments(false);

    try {
      const results = await getComments(postId);

      setComments(results);
    } catch {
      setErrorComments(true);
    } finally {
      setIsLoadingComments(false);
    }
  }

  async function fetchDeleteComment(id: number) {
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== id),
    );

    try {
      await deleteComments(id);
    } catch (errDelete) {
      throw errDelete;
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const loadingUsers = await getUsers();

        setUsers(loadingUsers);
      } catch (errUsers) {
        throw errUsers;
      }
    };

    fetchUsers();
  }, []);

  let content;

  if (!isUserSelected) {
    content = <p data-cy="NoSelectedUser">No user selected</p>;
  } else if (isLoading) {
    content = <Loader />;
  } else if (posts.length > 0) {
    content = (
      <PostsList
        posts={posts}
        setIsSidebarOpen={setIsSidebarOpen}
        onSelectedComment={fetchComments}
        onSelectedPost={setSelectedPost}
      />
    );
  } else if (error) {
    content = (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        Something went wrong!
      </div>
    );
  } else {
    content = (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onSelect={fetchPosts}
                  selectedId={selectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {content}
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
                'Sidebar--open': isSidebarOpen,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {isSidebarOpen && (
                <PostDetails
                  onDelete={fetchDeleteComment}
                  onSubmit={fetchCreateComment}
                  comments={comments}
                  selectedPost={selectedPost}
                  isLoading={isLoadingComments}
                  errorComments={errorComments}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
