import cls from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUsers } from './components/api/users';
import { NotificationType } from './types/Notifications';
import { getUserPosts } from './components/api/userPosts';
import { Post } from './types/Post';
import {
  addNewPostComment,
  deletePostComment,
  getPostComments,
} from './components/api/postComments';
import { Comment, CommentData } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const [loading, setLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const [error, setError] = useState<string>('');
  const [commentsError, setCommentsError] = useState<string>('');

  const [userId, setUserId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then(data => {
        if (!data) {
          setError(NotificationType.USERS);

          return;
        }

        setUsers(data);
      })
      .catch(err => {
        setError(NotificationType.USERS);
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function loadPosts() {
    if (!userId) {
      setPosts([]);

      return;
    }

    setLoading(true);
    setComments([]);
    setSelectedPostId(null);
    setPosts([]);
    setError('');

    getUserPosts(userId)
      .then(data => {
        if (!data || (typeof data === 'object' && 'error' in data)) {
          setError(NotificationType.POSTS);

          return;
        }

        setPosts(data);
      })
      .catch(err => {
        setError(NotificationType.POSTS);
        throw err;
      })
      .finally(() => setLoading(false));
  }

  function loadComments() {
    if (!selectedPostId) {
      return;
    }

    setCommentsLoading(true);
    setCommentsError('');
    setComments([]);

    getPostComments(selectedPostId)
      .then(data => {
        if (!data) {
          setCommentsError(NotificationType.COMMENTS);

          return;
        }

        setComments(data);
      })
      .catch(err => {
        setCommentsError(NotificationType.COMMENTS);
        throw err;
      })
      .finally(() => setCommentsLoading(false));
  }

  useEffect(loadPosts, [userId]);
  useEffect(loadComments, [selectedPostId]);

  function onAddNewComment(commentData: CommentData, postId: number) {
    const newComment: Omit<Comment, 'id'> = {
      ...commentData,
      postId,
    };

    return addNewPostComment(newComment)
      .then(data => {
        if (!data) {
          setCommentsError(NotificationType.ADD_COMMENT);

          return;
        }

        if (postId === selectedPostId) {
          setComments(prevComments => [...prevComments, data]);
        }
      })
      .catch(err => {
        setCommentsError(NotificationType.ADD_COMMENT);
        throw err;
      });
  }

  function onDeleteComment(id: number) {
    // Optimistic update
    const currentComments = [...comments];
    const updatedComments = comments.filter(comment => comment.id !== id);

    setComments(updatedComments);

    // Pessimistic update
    return deletePostComment(id).catch(err => {
      setComments(currentComments);
      setCommentsError(NotificationType.DELETE_COMMENT);
      throw err;
    });
  }

  const selectedPost: Post | null = selectedPostId
    ? posts.find(post => post.id === selectedPostId) || null
    : null;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  userId={userId}
                  setUserId={setUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!userId && <p data-cy="NoSelectedUser">No user selected</p>}
                {loading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}
                {userId && !posts.length && !loading && !error && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {posts.length !== 0 && (
                  <PostsList
                    posts={posts}
                    setSelectedPostId={setSelectedPostId}
                    selectedPostId={selectedPostId}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cls('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': selectedPostId !== null,
            })}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  comments={comments}
                  error={commentsError}
                  post={selectedPost}
                  selectedPostId={selectedPostId}
                  onSubmitForm={onAddNewComment}
                  onDeleteComment={onDeleteComment}
                  commentsLoading={commentsLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
