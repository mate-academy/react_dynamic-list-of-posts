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
  const [usersList, setUserList] = useState<User[]>([]);
  const [userSelect, setUserSelect] = useState<User | null>(null);

  const [postsList, setPostsList] = useState<Post[] | undefined>(undefined);
  const [postSelect, setPostSelect] = useState<Post | undefined>(undefined);
  const [isPostLoader, setIsPostLoader] = useState(false);
  const [errorPostInfo, setErrorPostInfo] = useState(false);

  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [errorComments, setErrorComments] = useState(false);

  const [openCommentForm, setOpenCommentForm] = useState(false);
  const [openCommentList, setOpenCommentList] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(users => {
        setUserList(users);
      })
      .catch(error => {
        throw error;
      });
  }, []);

  const handlePostList = (user: User) => {
    setIsPostLoader(true);
    setPostsList(undefined);
    setCommentsList([]);
    setPostSelect(undefined);
    setErrorPostInfo(false);
    setUserSelect(user);
    setIsSidebarOpen(false);

    client
      .get<Post[]>(`/posts?userId=${user.id}`)
      .then(posts => setPostsList(posts))
      .catch(() => setErrorPostInfo(true))
      .finally(() => setIsPostLoader(false));
  };

  const handlePostInfo = (post: Post) => {
    setOpenCommentForm(false);
    setErrorComments(false);
    setOpenCommentList(true);
    setIsCommentsLoading(true);
    setIsSidebarOpen(true);
    setPostSelect(post);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(comments => setCommentsList(comments))
      .catch(() => setErrorComments(true))
      .finally(() => setIsCommentsLoading(false));
  };

  const handleClosePostInfo = () => {
    setOpenCommentList(false);
    setOpenCommentForm(false);
    setIsSidebarOpen(false);
    setPostSelect(undefined);
  };

  const handleCommentsList = (data: Comment | number) => {
    if (typeof data === 'number') {
      setCommentsList((currentList: Comment[]) =>
        currentList.filter(comment => comment.id !== data),
      );
      client.delete(`/comments/${data}`).catch(() => {
        setCommentsList(commentsList);
        setErrorComments(true);
      });
    } else {
      setCommentsList(currentList => [...currentList, data]);
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
                  usersList={usersList}
                  userSelect={userSelect}
                  onUserSelect={handlePostList}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!userSelect && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostLoader && <Loader />}

                {errorPostInfo && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isPostLoader && !errorPostInfo && postsList?.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {postsList && postsList.length > 0 && (
                  <PostsList
                    postSelect={postSelect}
                    postList={postsList}
                    onPostSelect={handlePostInfo}
                    onPostClose={handleClosePostInfo}
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
              {
                'Sidebar--open': isSidebarOpen,
              },
            )}
          >
            {openCommentList && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  errorComments={errorComments}
                  openCommentForm={openCommentForm}
                  postSelect={postSelect}
                  commentsList={commentsList}
                  isLoader={isCommentsLoading}
                  onCommentsList={handleCommentsList}
                  onOpenCommentForm={setOpenCommentForm}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
