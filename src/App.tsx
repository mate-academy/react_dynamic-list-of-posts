import React, { useState } from 'react';
import { DebounceInput as SearchInput } from 'react-debounce-input';
import { POSTS_URL, USERS_URL, COMMENTS_URL, EMPTY_USER } from './const';
import { loadFromServer } from './api';
import {
  CommentInterface,
  NormalizedPostInterface,
  PostInterface,
  UserInterface,
} from './interfaces';
import PostList from './PostList';
import './App.css';

const App: React.FC = () => {
  const [posts, setPosts] = useState<NormalizedPostInterface[]>([]);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<NormalizedPostInterface[]>(
    [],
  );

  const normalizePosts: (
    postsList: PostInterface[],
    usersList: UserInterface[],
    commentsList: CommentInterface[],
  ) => NormalizedPostInterface[] = (postsList, usersList, commentsList) =>
    postsList.map(post => ({
      ...post,
      comments: commentsList.filter(comment => comment.postId === post.id),
      user: usersList.find(user => user.id === post.userId) || EMPTY_USER,
    }));

  const loadPosts: () => void = async () => {
    try {
      setIsLoading(true);
      setError('');

      const [postsList, usersList, commentsList] = await Promise.all([
        loadFromServer(POSTS_URL),
        loadFromServer(USERS_URL),
        loadFromServer(COMMENTS_URL),
      ]);

      const postsData: NormalizedPostInterface[] = normalizePosts(
        postsList,
        usersList,
        commentsList,
      );

      setPosts(postsData);
      setFilteredPosts(postsData);
      setIsLoading(false);
      setIsStarted(true);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  const filterPosts: (e: React.ChangeEvent<HTMLInputElement>) => void = e => {
    const searchQuery = e.target.value.trim().toLowerCase();

    setFilteredPosts(
      posts.filter(post =>
        (post.title + post.body).toLowerCase().includes(searchQuery),
      ),
    );
  };

  if (error) {
    return (
      <div className="post__start">
        <span className="error">{error}</span>
        <button
          disabled={isLoading}
          className="post__button"
          type="button"
          onClick={loadPosts}
        >
          {isLoading ? 'Loading...' : 'Try again'}
        </button>
      </div>
    );
  }

  return (
    <>
      {isStarted ? (
        <div className="post">
          <h1 className="title">Dynamic list of posts</h1>
          <SearchInput
            className="post__search"
            debounceTimeout={500}
            placeholder="Type to search..."
            onChange={filterPosts}
          />
          <PostList posts={filteredPosts} />
        </div>
      ) : (
        <div className="post__start">
          <button
            disabled={isLoading}
            className="post__button"
            type="button"
            onClick={loadPosts}
          >
            {isLoading ? 'Loading...' : 'Load Posts'}
          </button>
        </div>
      )}
    </>
  );
};

export default App;
