import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import {
  deleteComment,
  getComments,
  getPosts,
  getUsers,
} from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [isErrorPosts, setIsErrorPosts] = useState(false);
  const [isErrorPost, setIsErrorPost] = useState(false);
  const [isPosts, setIsPosts] = useState(false);
  const [choosenUser, setChoosenUser] = useState<User | null>(null);
  const [isPostsId, setIsPostsId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [wrtCommentBtnClk, setWrtCommentBtnClk] = useState(false);

  const loadUsers = async () => {
    const loadingUsers = await getUsers();

    setUsers(loadingUsers);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handlePickerClick = () => {
    setIsPickerOpen(state => !state);
  };

  const handleChoosenUser = async (user: User) => {
    setIsPostsId(null);

    try {
      setWrtCommentBtnClk(false);
      setIsPosts(false);
      setIsErrorPosts(false);
      setIsLoadingPosts(true);
      setIsPickerOpen(false);
      setChoosenUser(user);
      const loadingPosts = await getPosts(user.id);

      setPosts(() => {
        return [...loadingPosts as Post[]];
      });
      setIsLoadingPosts(false);
      if (!loadingPosts?.length) {
        setIsPosts(true);
      }
    } catch {
      setIsLoadingPosts(false);
      setIsErrorPosts(true);
    }
  };

  const visiblePost = useMemo(() => {
    return posts.find(postO => postO.id === isPostsId);
  }, [isPostsId, posts]);

  const handlePostDetailsId = async (id: number | null) => {
    setWrtCommentBtnClk(false);

    if (id === isPostsId) {
      setIsPostsId(null);
      setComments([]);
    } else {
      setIsPostsId(id);
      try {
        setComments([]);
        setIsLoadingPost(true);
        const loadingComment: unknown = await getComments(id);

        setComments(() => {
          return [...loadingComment as Comment[]];
        });
        setIsLoadingPost(false);
      } catch {
        setIsErrorPost(true);
      }
    }
  };

  const handleWrtCommentBtnClk = () => {
    setWrtCommentBtnClk(true);
  };

  const handleCommentDelete = (id: number) => {
    try {
      deleteComment(id);

      setComments(state => {
        return [...state.filter(comment => comment.id !== id)];
      });
    } catch {
      setIsErrorPosts(true);
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
                  choosenUser={choosenUser}
                  handleChoosenUser={handleChoosenUser}
                  handlePickerClick={handlePickerClick}
                  isPickerOpen={isPickerOpen}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!choosenUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
                {isLoadingPosts && (
                  <Loader />
                )}

                {isErrorPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!posts?.length && (
                  <PostsList
                    posts={posts}
                    handlePostDetailsId={handlePostDetailsId}
                    isPostsId={isPostsId}
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
              { 'Sidebar--open': isPostsId },
            )}
          >
            {isPostsId && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={visiblePost}
                  error={isErrorPost}
                  isLoadingPost={isLoadingPost}
                  comments={comments}
                  handleWrtCommentBtnClk={handleWrtCommentBtnClk}
                  wrtCommentBtnClk={wrtCommentBtnClk}
                  handleCommentDelete={handleCommentDelete}
                  setComments={setComments}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
