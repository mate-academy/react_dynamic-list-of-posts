import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { PostsLoadingError } from './components/PostsLoadingError';
import { NoPostsYet } from './components/NoPostsYet';
import { NoSelectedUser } from './components/NoSelectedUser';
import { Sidebar } from './components/Sidebar';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import {
  deleteComment,
  getComments,
  getPosts,
  getUsers,
  postComment,
} from './api/ClientsMetods';
import { Comment } from './types/Comment';

export const App = () => {
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  // todo find a correct name
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openedPost, setOpenedPost] = useState<Post | null>(null);
  // bool?
  const [activeDropdownMenu, setActiveDropdownMenu] = useState(false);
  // bool?
  const [hasCommentsError, setHasCommentsError] = useState(false);
  // prefer empty array instead of nullable
  const [comments, setComments] = useState<Comment[]>([]);
  // bool, give it a correct name
  const [hasCommentsLoader, setHasCommentsLoader] = useState(false);
  const [hasAddCommentLoader, setHasAddCommentLoader] = useState(false);
  const [isCommentFormOpened, setIsCommentFormOpened] = useState(false);

  useEffect(() => {
    setHasError(false);

    getUsers()
      .then(setUsers)
      .catch(() => setHasError(true));
  }, []);

  const handleSelectUser = async (user: User) => {
    setPostsList([]);
    setIsLoading(true);
    setSelectedUser(user);
    setHasError(false);
    setOpenSidebar(false);
    setOpenedPost(null);

    getPosts(user.id)
      .then(setPostsList)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  const handleOpenSidebar = async (post: Post) => {
    setActiveDropdownMenu(false);
    setIsCommentFormOpened(false);

    if (openSidebar && openedPost?.id === post.id) {
      setOpenSidebar(false);
      setOpenedPost(null);
      setComments([]);
    } else {
      setOpenSidebar(true);
      setOpenedPost(post);
      setHasCommentsLoader(true);
      setHasCommentsError(false);
      setComments([]);
    }

    getComments(post.id)
      .then(setComments)
      .catch(() => setHasCommentsError(true))
      .finally(() => setHasCommentsLoader(false));
  };

  const handleDeleteComment = (commentId: number) => {
    setHasCommentsError(false);

    deleteComment(commentId)
      .then(() => {
        setComments(prev =>
          prev ? prev.filter(comment => comment.id !== commentId) : [],
        );
      })
      .catch(() => setHasCommentsError(true));
  };

  const handleAddComment = (
    comment: Omit<Comment, 'id'>,
    onSuccess: () => void,
  ) => {
    setHasCommentsError(false);
    setHasAddCommentLoader(true);

    postComment(comment)
      .then(newComment => {
        setComments(prev => (prev ? [...prev, newComment] : [newComment]));
        onSuccess();
      })
      .catch(() => setHasCommentsError(true))
      .finally(() => setHasAddCommentLoader(false));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  handleSelectUser={handleSelectUser}
                  users={users}
                  selectedUser={selectedUser}
                  activeDropdownMenu={activeDropdownMenu}
                  setActiveDropdownMenu={setActiveDropdownMenu}
                  hasError={hasError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && <NoSelectedUser />}

                {isLoading && <Loader />}

                {hasError && <PostsLoadingError />}

                {selectedUser &&
                  postsList.length === 0 &&
                  !isLoading &&
                  !hasError && <NoPostsYet />}

                {postsList.length > 0 && (
                  <PostsList
                    postsList={postsList}
                    openSidebar={openSidebar}
                    openedPost={openedPost}
                    handleOpenSidebar={handleOpenSidebar}
                  />
                )}
              </div>
            </div>
          </div>

          {openSidebar && openedPost && selectedUser && (
            <Sidebar
              openedPost={openedPost}
              hasCommentsError={hasCommentsError}
              comments={comments}
              hasCommentsLoader={hasCommentsLoader}
              handleDeleteComment={handleDeleteComment}
              hasError={hasError}
              handleAddComment={handleAddComment}
              hasAddCommentLoader={hasAddCommentLoader}
              setIsCommentFormOpened={setIsCommentFormOpened}
              isCommentFormOpened={isCommentFormOpened}
            />
          )}
        </div>
      </div>
    </main>
  );
};
