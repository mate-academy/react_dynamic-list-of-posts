import classNames from 'classnames';

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
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUserId, setActiveUserId] = useState<number | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState<boolean>();

  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentError, setIsCommentError] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    client.get<User[]>('/users').then(response => {
      setUsers(response);
    });
  }, []);

  useEffect(() => {
    if (activeUserId === null) {
      return;
    }

    setIsPostsLoading(true);
    setIsError(false);

    client
      .get<Post[]>(`/posts?userId=${activeUserId}`)
      .then(response => {
        setPosts(response);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsPostsLoading(false));
  }, [activeUserId]);

  useEffect(() => {
    if (activePostId === null) {
      return;
    }

    setIsCommentLoading(true);
    setIsCommentError(false);

    client
      .get<Comment[]>(`/comments?postId=${activePostId}`)
      .then(response => {
        setComments(response);
      })
      .catch(() => setIsCommentError(true))
      .finally(() => setIsCommentLoading(false));
  }, [activePostId]);

  const addComment = (comment: Comment) => {
    setComments(currentComments => [...currentComments, comment]);
  };

  const deleteComment = (commentId: number) => {
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );
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
                  isDropdownActive={isDropdownActive}
                  setIsDropdownActive={setIsDropdownActive}
                  setActiveUserId={setActiveUserId}
                  setIsSidebarOpen={setIsSidebarOpen}
                  activeUserId={activeUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!activeUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {activeUserId !== null &&
                  (isPostsLoading ? (
                    <Loader />
                  ) : isError ? (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  ) : posts.length === 0 ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      posts={posts}
                      isSidebarOpen={isSidebarOpen}
                      setIsSidebarOpen={setIsSidebarOpen}
                      activePostId={activePostId}
                      setActivePostId={setActivePostId}
                      setIsFormOpen={setIsFormOpen}
                    />
                  ))}
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
            {isSidebarOpen && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  posts={posts}
                  activePostId={activePostId}
                  comments={comments}
                  isCommentError={isCommentError}
                  isCommentLoading={isCommentLoading}
                  isFormOpen={isFormOpen}
                  setIsFormOpen={setIsFormOpen}
                  onCommentAdded={addComment}
                  onCommentDeleted={deleteComment}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
