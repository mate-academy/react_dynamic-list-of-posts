import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';
import { client } from './utils/fetchClient';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState('');
  const [isSideBarOpened, setIsSideBarOpened] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState('');
  const [isCommentFormOpened, setIsCommentFormOpened] = useState(false);
  const [isLoadingComment, setIsLoadingComment] = useState(false);

  async function fetchUsers() {
    const data = await client.get<User[]>('/users');

    setUsers(data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const loadPosts = async (user: User) => {
    if (user === selectedUser) {
      return;
    }

    try {
      setIsSideBarOpened(false);
      setIsLoadingPosts(true);
      setPostsError('');

      const data = await client.get<Post[]>(`/posts?userId=${user.id}`);

      setPosts(data);
    } catch (error) {
      setPosts([]);
      setPostsError('Failed to load posts');
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const loadComments = async (post: Post) => {
    try {
      setIsLoadingComments(true);
      setCommentsError('');

      const data = await client.get<Comment[]>(`/comments?postId=${post.id}`);

      setComments(data);
      setCurrentPost(post);
    } catch (error) {
      setComments([]);
      setCommentsError('Failed to load comments');
    } finally {
      setIsLoadingComments(false);
    }
  };

  const addComment = async ({
    postId,
    name,
    email,
    body,
  }: CommentData) => {
    try {
      setIsLoadingComment(true);
      const response: Comment = await client.post(
        '/comments', {
          postId, name, email, body,
        },
      );

      setComments((prevComments) => {
        if (prevComments !== null) {
          return [...prevComments, response];
        }

        return [response];
      });
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    } finally {
      setIsLoadingComment(false);
    }
  };

  const deleteComment = (id: number) => {
    client.delete(`/comments/${id}`);
    setComments((currentComments): Comment[] => {
      if (currentComments) {
        return currentComments.filter(
          currentComment => currentComment.id !== id,
        );
      }

      return [];
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
                  users={users}
                  loadPosts={loadPosts}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoadingPosts && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts && posts.length > 0 && !isLoadingPosts && (
                  <PostsList
                    posts={posts}
                    isSideBarOpened={isSideBarOpened}
                    setSideBarOpened={setIsSideBarOpened}
                    loadComments={loadComments}
                    setIsCommentFormOpened={setIsCommentFormOpened}
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
              { 'Sidebar--open': isSideBarOpened },
            )}
          >
            {isSideBarOpened && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  currentPost={currentPost}
                  comments={comments}
                  isLoadingComments={isLoadingComments}
                  commentsError={commentsError}
                  isCommentFormOpened={isCommentFormOpened}
                  setIsCommentFormOpened={setIsCommentFormOpened}
                  addComment={addComment}
                  isLoadingComment={isLoadingComment}
                  deleteComment={deleteComment}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
