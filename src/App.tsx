import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { PostsList } from './components/PostsList/PostsList';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { ErrorMessage } from './constants/ErrorMessage';
import { getUsers } from './api/users';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { Post } from './types/Post';
import { getPosts } from './api/posts';
import { addComment, deleteComment, getComments } from './api/comments';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [error, setError] = useState(ErrorMessage.EMPTY);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deletingCommentIds, setDeletingCommentIds] = useState<number[]>([]);

  useEffect(() => {
    const loadUser = async () => {
      setLoadingUsers(true);
      try {
        const usersFromServer = await getUsers();

        setUsers(usersFromServer);
      } catch {
        setError(ErrorMessage.LOADING_ERROR);
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    const loadComment = async () => {
      setLoadingComments(true);

      try {
        const commentsFromServer = await getComments();

        setComments(commentsFromServer);
      } catch {
        setError(ErrorMessage.LOADING_ERROR);
      } finally {
        setLoadingComments(false);
      }
    };

    loadComment();
  }, []);

  useEffect(() => {
    if (selectedUser === null) {
      setPosts([]);

      return;
    }

    const loadPost = async () => {
      setLoadingPosts(true);
      try {
        const postsFromServer = await getPosts(selectedUser);

        setPosts(postsFromServer);
      } catch {
        setError(ErrorMessage.LOADING_ERROR);
      } finally {
        setLoadingPosts(false);
      }
    };

    loadPost();
  }, [selectedUser]);

  const handleAddComment = async (commentData: Omit<Comment, 'id'>) => {
    try {
      const newComment = await addComment(commentData);

      setComments(prev => [...prev, newComment]);
    } catch (e) {
      setError(ErrorMessage.FAILED_ADD_COMMENT);
    }
  };

  const handleDeleteComment = async (id: number) => {
    setDeletingCommentIds(prev => [...prev, id]);
    try {
      await deleteComment(id);
      setComments(current => current.filter(comment => comment.id !== id));
    } catch {
      setError(ErrorMessage.DELETE);
    } finally {
      setDeletingCommentIds(prev => prev.filter(comment => comment !== id));
    }
  };

  const selectedPost = posts.find(post => post.id === selectedPostId);

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
                  loading={loadingUsers}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <ErrorNotification
                    message={ErrorMessage.NO_USER}
                    dataCy="NoSelectedUser"
                    type="warning"
                  />
                )}

                {error && (
                  <ErrorNotification
                    dataCy="PostsLoadingError"
                    message={ErrorMessage.LOADING_ERROR}
                    type="danger"
                  />
                )}

                {!loadingUsers && selectedUser && posts.length === 0 && (
                  <ErrorNotification
                    dataCy="NoPostsYet"
                    message={ErrorMessage.NO_POST}
                    type="warning"
                  />
                )}

                <PostsList
                  posts={posts}
                  selectedPostId={selectedPostId}
                  selectedUser={selectedUser}
                  setSelectedPostId={setSelectedPostId}
                  loading={loadingPosts}
                />
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                posts={posts}
                selectedPostId={selectedPostId}
                loading={loadingComments}
                error={error}
                comments={comments}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
