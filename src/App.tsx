import React, { useState, useMemo } from 'react';
import './App.css';
import { PostList } from './components/PostList/PostList';

import {
  getUsers,
  getPosts,
  getComments,
  User,
  Post,
  Comment
} from './helpers/api';

export const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const postsFromServer = await getPosts();
      const usersFromServer = await getUsers();
      const commentsFromServer = await getComments();

      const modifiedPostList = postsFromServer.map((post: Post) => ({
        ...post,
        user: usersFromServer.find((user: User) => user.id === post.userId),
        comments: commentsFromServer.filter((comment: Comment) =>
          comment.postId === post.id),
      }));

      setPosts(modifiedPostList);
      setIsLoaded(true);
      setErrorMessage('');
    } catch (exeption) {
      setErrorMessage('Error');
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  const changeFilterInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQuery(event.target.value);
  }

  const resetFilter = () => {
    setFilterQuery('');
  }

  const filterPosts = (filterQuery: string, posts: Post[]) => (
    posts.filter(({ title, body }) =>
      (title + body).toLowerCase().includes(filterQuery.toLowerCase()))
  );

  const visiblePosts = useMemo(() => filterPosts(filterQuery, posts), [
    filterQuery,
    posts,
  ]);

  return (
    <section className="post-list">
      <h1 className="post-list__title">Dynamic list of posts</h1>

      {!isLoaded ? (
      <>
        <button
          type="button"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? `Loading...` : `Load`}
        </button>
        {errorMessage && (<p>{errorMessage}</p>)}
      </>
      ) : (
        <>
          <div>
            <input
              type="textarea"
              className="post-list__filter"
              value={filterQuery}
              onChange={changeFilterInput}
            />
            <button
              type="button"
              onClick={resetFilter}
            >
              Reset
            </button>
          </div>

          <PostList
            posts={visiblePosts}
          />
        </>

      )}
    </section>
  )
}
