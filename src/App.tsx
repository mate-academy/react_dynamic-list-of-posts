import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import * as userService from './api/userApi';
import { User } from './types/User';
import * as postService from './api/postApi';
import { Post } from './types/Post';
import * as commentService from './api/commentApi';
import { Comment } from './types/Comment';
import { LoadingState } from './types/LoadingState';
import { AppErrorState } from './types/ErrorState';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [chosenUser, setChosenUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [loading, setLoading] = useState<LoadingState>({
    posts: false,
    comments: false,
    form: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const [error, setError] = useState<AppErrorState>({
    users: false,
    posts: false,
    comments: false,
  });

  useEffect(() => {
    async function loadUsers() {
      try {
        const newUsers = await userService.getUsers();

        setUsers(newUsers);
      } catch (e) {
        setError(prev => ({
          ...prev,
          users: true,
        }));
      }
    }

    loadUsers();
  }, []);

  useEffect(() => {
    async function loadUserPosts(userId: number) {
      setError(prev => ({
        ...prev,
        posts: false,
      }));
      setLoading(prev => ({
        ...prev,
        posts: true,
      }));
      setIsLoaded(false);
      try {
        const newPosts = await postService.getUserPosts(userId);

        setUserPosts(newPosts);
      } catch (e) {
        setError(prev => ({
          ...prev,
          posts: true,
        }));
      } finally {
        setLoading(prev => ({
          ...prev,
          posts: false,
        }));
        setIsLoaded(true);
      }
    }

    if (chosenUser) {
      loadUserPosts(chosenUser.id);
    }
  }, [chosenUser]);

  useEffect(() => {
    async function loadPostComments(postId: number) {
      setError(prev => ({
        ...prev,
        comments: false,
      }));
      setLoading(prev => ({
        ...prev,
        comments: true,
      }));
      setIsLoaded(false);
      try {
        const newComments = await commentService.getPostComments(postId);

        setPostComments(newComments);
      } catch (e) {
        setError(prev => ({
          ...prev,
          comments: true,
        }));
      } finally {
        setLoading(prev => ({
          ...prev,
          comments: false,
        }));
        setIsLoaded(true);
      }
    }

    if (selectedPost) {
      loadPostComments(selectedPost.id);
    }
  }, [selectedPost]);

  async function addComment({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) {
    setError(prev => ({
      ...prev,
      comments: false,
    }));
    setLoading(prev => ({
      ...prev,
      form: true,
    }));

    try {
      const newComment = await commentService.addPostComment({
        postId,
        name,
        email,
        body,
      });

      setPostComments(currentComments => [...currentComments, newComment]);
    } catch (e) {
      setError(prev => ({
        ...prev,
        comments: true,
      }));
    } finally {
      setLoading(prev => ({
        ...prev,
        form: false,
      }));
      setIsLoaded(true);
    }
  }

  function deleteComment(commentId: number) {
    commentService.deletePostComment(commentId);

    setPostComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );
  }

  const showNoPosts =
    !userPosts.length && !loading.posts && isLoaded && !error.posts;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  chosenUser={chosenUser}
                  onSelect={user => {
                    setChosenUser(user);
                    setSelectedPost(null);
                  }}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!chosenUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading.posts && <Loader />}

                {error.posts && isLoaded && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!userPosts.length && !loading.posts && (
                  <PostsList
                    posts={userPosts}
                    selecetedPost={selectedPost}
                    onSelectedPost={setSelectedPost}
                  />
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                  comments={postComments}
                  loading={loading}
                  isError={error.comments}
                  onAddComment={addComment}
                  onDeleteComment={deleteComment}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
