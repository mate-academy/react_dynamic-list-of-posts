import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { Post } from './types/Post';
import { addComment, deleteComment, getComments } from './api/comments';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isLoadingNewComment, setIsLoadingNewComment] = useState(false);
  const [
    deletingCommentsID, setDeletingCommentsID,
  ] = useState<number[]>([]);
  const [isLoadingPostsError, setIsLoadingPostsError] = useState(false);
  const [isLoadingCommentsError, setIsLoadingCommentsError] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [formIsVisible, setFormIsVisible] = useState(false);

  const usersIsLoaded = users.length !== 0;

  useEffect(() => {
    async function fetchUsers() {
      const loadedUsers = await getUsers();

      setUsers(loadedUsers);
    }

    fetchUsers();
  }, []);

  const commentLoadingError = () => {
    setIsLoadingCommentsError(true);
    setTimeout(() => setIsLoadingCommentsError(false), 2000);
  };

  const fetchPosts = async (userId: number) => {
    setIsLoadingPostsError(false);
    setIsLoadingPosts(false);
    try {
      const loadedPosts = await getPosts(userId);

      setPosts(loadedPosts);
    } catch (e) {
      setIsLoadingPostsError(true);
    } finally {
      setIsLoadingPosts(true);
    }
  };

  const fetchComments = async (postId: number) => {
    setIsLoadingCommentsError(false);
    setIsLoadingComments(true);
    try {
      const loadedComments = await getComments(postId);

      setComments(loadedComments);
    } catch {
      setIsLoadingCommentsError(true);
    }

    setIsLoadingComments(false);
  };

  const selectUser = (user: User) => {
    setSelectedPost(null);
    setSelectedUser(user);
  };

  const selectPost = (post: Post) => {
    setFormIsVisible(false);

    if (post === selectedPost) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
      fetchComments(post.id);
    }
  };

  const showForm = () => {
    setFormIsVisible(true);
  };

  const createComment = async (
    name: string, email: string, commentText: string,
  ) => {
    setIsLoadingNewComment(true);
    const newComment = {
      postId: selectedPost ? selectedPost.id : 0,
      name,
      email,
      body: commentText,
    };

    try {
      const response = await addComment(newComment);

      const responseComment = JSON.parse(JSON.stringify(response));

      const addedComment = {
        id: responseComment.id,
        postId: responseComment.postId,
        name: responseComment.name,
        email: responseComment.email,
        body: responseComment.body,
      };

      setComments(current => [...current, addedComment]);
    } catch {
      commentLoadingError();
    }

    setIsLoadingNewComment(false);
  };

  const removeComment = async (commentId: number) => {
    setDeletingCommentsID(current => [...current, commentId]);
    try {
      await deleteComment(commentId);
      setComments(
        current => current.filter(comment => comment.id !== commentId),
      );
    } catch (e) {
      commentLoadingError();
    }

    setDeletingCommentsID(current => current.filter(id => id !== commentId));
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
                  selectedUser={selectedUser}
                  onSelect={selectUser}
                  fetchPosts={fetchPosts}
                  usersIsLoaded={usersIsLoaded}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {selectedUser ? (
                  <>
                    {!isLoadingPosts && <Loader />}
                    {isLoadingPostsError ? (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    ) : (
                      <>
                        {isLoadingPosts && (
                          <>
                            {posts.length === 0 ? (
                              <div
                                className="notification is-warning"
                                data-cy="NoPostsYet"
                              >
                                No posts yet
                              </div>
                            ) : (
                              <PostsList
                                posts={posts}
                                selectPost={selectPost}
                                selectedPost={selectedPost}
                              />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost !== null && (
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  loadingComments={isLoadingComments}
                  commentsLoadingError={isLoadingCommentsError}
                  formIsVisible={formIsVisible}
                  showForm={showForm}
                  createComment={createComment}
                  loadingNewComment={isLoadingNewComment}
                  removeComment={removeComment}
                  deletingCommentsID={deletingCommentsID}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
