import React, { useState, useEffect, useReducer } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

interface AppState {
  posts: Post[];
  selectedPost: Post | null;
  isLoading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'RESET' }
  | { type: 'START_LOADING' }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_SELECTED_POST'; payload: Post | null };

const initialState: AppState = {
  posts: [],
  selectedPost: null,
  isLoading: false,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'RESET':
      return initialState;
    case 'START_LOADING':
      return { ...state, isLoading: true, error: null, selectedPost: null };
    case 'SET_POSTS':
      return { ...state, posts: action.payload, isLoading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_SELECTED_POST':
      return { ...state, selectedPost: action.payload };
    default:
      return state;
  }
}

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    if (!selectedUser) {
      dispatch({ type: 'RESET' });

      return;
    }

    const loadPosts = async () => {
      dispatch({ type: 'START_LOADING' });

      try {
        const postsData = await client.get<Post[]>(
          `/posts?userId=${selectedUser.id}`,
        );

        dispatch({ type: 'SET_POSTS', payload: postsData });
      } catch {
        dispatch({ type: 'SET_ERROR', payload: 'Something went wrong!' });
      }
    };

    loadPosts();
  }, [selectedUser]);

  const handlePostSelect = (post: Post) => {
    dispatch({
      type: 'SET_SELECTED_POST',
      payload: state.selectedPost?.id === post.id ? null : post,
    });
  };

  const showNoUserSelected = !selectedUser;
  const showNoPosts =
    !state.isLoading && !state.error && state.posts.length === 0;
  const showPostsList =
    !state.isLoading && !state.error && state.posts.length > 0;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  onUserSelect={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {showNoUserSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {state.isLoading && <Loader />}

                {state.error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {state.error}
                  </div>
                )}

                {showNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPostsList && (
                  <PostsList
                    posts={state.posts}
                    selectedPostId={state.selectedPost?.id || null}
                    onPostSelect={handlePostSelect}
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
              { 'Sidebar--open': state.selectedPost !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails post={state.selectedPost} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
