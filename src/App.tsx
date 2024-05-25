import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUser } from './api/getUsers';
import { User } from './types/User';
import { Post } from './types/Post';
import { getPosts } from './api/getPosts';
import { deleteComment } from './api/deleteComment';
import { Comment } from './types/Comment';
import { addComment } from './api/addComment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isErrorOnLoadUsers, setIsErrorOnLoadUsers] = useState(false);
  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setloadingComments] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUser();

        setUsers(fetchedUsers);
      } catch (error) {
        setIsErrorOnLoadUsers(true);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (userSelected) {
        setLoading(true);

        try {
          const fetchedPosts = await getPosts(userSelected?.id);

          setPosts(fetchedPosts);
        } catch (error) {
          setIsErrorOnLoadUsers(true);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPosts();
  }, [userSelected]);

  const handleChangePost = (post: Post) => {
    setSelectedPost(post);
    setShowForm(false);
  };

  const handleDeleteComment = async (id: number) => {
    setComments(currentComment =>
      currentComment.filter(comment => comment.id !== id),
    );
    try {
      await deleteComment(id);
    } catch {
      setIsError(true);
    }
  };

  const createComment = async (
    userName: string,
    title: string,
    userEmail: string,
  ) => {
    if (selectedPost === null) {
      return;
    }

    const newComment = {
      body: title,
      postId: selectedPost?.id,
      name: userName,
      email: userEmail,
    };

    setloadingComments(true);
    try {
      await addComment(newComment).then(newPost =>
        setComments(currentComment => [...currentComment, newPost]),
      );
    } catch {
      setIsError(true);
    } finally {
      setloadingComments(false);
    }
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
                  userSelected={userSelected}
                  setUserSelected={setUserSelected}
                  setShowForm={setShowForm}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!userSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {isErrorOnLoadUsers && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts?.length === 0 && !loading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts && posts.length > 0 && !loading && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    handleChangePost={handleChangePost}
                    setSelectedPost={setSelectedPost}
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  comments={comments}
                  setComments={setComments}
                  handleDeleteComment={handleDeleteComment}
                  loadingComments={loadingComments}
                  createComment={createComment}
                  setIsError={setIsError}
                  isError={isError}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
