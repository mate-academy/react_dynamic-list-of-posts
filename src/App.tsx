import { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers } from './api/user';
import { getPosts } from './api/post';
import { addComment, deleteComment, getComments } from './api/comment';
import { Comment } from './types/Comment';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      try {
        const usersData = await getUsers();

        setUsers(usersData);
        setError(null);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoadingPosts(true);

      try {
        if (selectedUser) {
          const userPosts = await getPosts(selectedUser.id);

          setPosts(userPosts);
          setError(null);
        }
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [selectedUser]);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoadingComments(true);
      try {
        if (selectedPost) {
          const postComments = await getComments(selectedPost.id);

          setComments(postComments);
          setError(null);
        }
      } catch (err) {
        setError('Failed to load comments');
      } finally {
        setIsLoadingComments(false);
      }
    };

    fetchComments();
  }, [selectedPost]);

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments(currentComments =>
        currentComments.filter(comment => comment.id !== commentId),
      );
    } catch (err) {
      setError('Unable to delete comment');
    }
  };

  const handleAddComment = async (comment: Comment) => {
    setIsLoadingComments(true);
    try {
      const newComment: Comment = await addComment({
        postId: comment.postId,
        name: comment.name,
        email: comment.email,
        body: comment.body,
      });

      setComments(prevComments => [...prevComments, newComment]);
    } catch (err) {
      setError('Unable to add a comment');
    } finally {
      setIsLoadingComments(false);
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              {(isLoadingUsers || isLoadingPosts) && <Loader />}
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  users={users}
                  onSelect={setSelectedUser}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {selectedUser && !error && !isLoadingPosts ? (
                  posts.length > 0 ? (
                    <PostsList
                      posts={posts}
                      selectedPost={selectedPost}
                      onOpen={setSelectedPost}
                      onClose={() => {
                        setSelectedPost(null);
                      }}
                    />
                  ) : (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )
                ) : (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
              </div>

              {error && (
                <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                >
                  {error}
                </div>
              )}
            </div>
          </div>
          {selectedPost && (
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
                  post={selectedPost}
                  error={error}
                  comments={comments}
                  formOpen={setIsFormOpen}
                  isFormOpen={isFormOpen}
                  deleteComment={handleDeleteComment}
                  addComment={handleAddComment}
                  isLoadingComments={isLoadingComments}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
