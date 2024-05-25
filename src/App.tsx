//#region import
import { FC, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import cn from 'classnames';

import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './services/user';
import { getPosts } from './services/post';
import { addComment, deleteComment, getComment } from './utils/commentApi';
//#endregion

export const App: FC = () => {
  //#region state
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [errorComment, setErrorComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [creatLoadComments, setCreatLoadComments] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  //#endregion

  // getUsers
  useEffect(() => {
    setIsLoading(true);

    getUsers()
      .then(setUsers)
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, []);

  // getPosts
  useEffect(() => {
    if (selectedUser === null) {
      return;
    }

    setIsLoading(true);

    getPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, [selectedUser]);

  // getComments
  useEffect(() => {
    if (selectedPost === null) {
      return;
    }

    setLoadingComments(true);

    getComment(selectedPost.id)
      .then(setComments)
      .catch(() => setErrorComment('Something went wrong!'))
      .finally(() => setLoadingComments(false));
  }, [selectedPost]);

  const deletesComment = async (id: number) => {
    try {
      await deleteComment(id);

      setComments(currentComment =>
        currentComment.filter(comment => comment.id !== id),
      );
    } catch {
      setErrorComment('Something went wrong!');
    }
  };

  const creatComment = async (
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

    setCreatLoadComments(true);
    try {
      await addComment(newComment).then(newPost =>
        setComments(currentComment => [...currentComment, newPost]),
      );
    } catch {
      setErrorComment('Something went wrong!');
    } finally {
      setCreatLoadComments(false);
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
                  setIsOpen={setIsOpen}
                  setSelectedUser={setSelectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {!isLoading &&
                  !errorMessage &&
                  selectedUser &&
                  (!posts.length ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      posts={posts}
                      setSelectedPost={setSelectedPost}
                      setIsOpen={setIsOpen}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': isOpen,
            })}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  errorMessage={errorComment}
                  comments={comments}
                  loadingComments={loadingComments}
                  deleteComment={deletesComment}
                  creatComment={creatComment}
                  creatLoadComments={creatLoadComments}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
