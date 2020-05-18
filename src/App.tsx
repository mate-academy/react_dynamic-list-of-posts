import React, { useState, useMemo, useCallback } from 'react';
import './App.scss';
import debounce from 'lodash/debounce';
import { getPosts, getUsers, getComments } from './api/api';
import PostList from './PostList/PostList';

const getFilteredPosts = (posts: Post[], query: string) => {
  const searchText = query.toLowerCase();

  return posts.filter((post: Post) => (post.title + post.body)
    .toLowerCase()
    .includes(searchText));
};

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState<string>('');
  const [filterQuery, setfilterQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const loadPosts = async () => {
    setIsLoading(!isLoading);
    setIsVisible(!isVisible);
    const postFromServer = await getPosts();
    const usersFromServer = await getUsers();
    const commentsFromServer = await getComments();

    const preparedPosts = postFromServer.map(post => {
      const user = usersFromServer
        .find((currentUser: User) => currentUser.id === post.userId);
      const userComments = commentsFromServer
        .filter((comment: Comment) => (comment.postId === post.id));

      return {
        ...post,
        user,
        userComments,
      };
    });

    setPosts(preparedPosts);
    setIsLoading(false);
  };

  const setfilterQueryWhitDebounce = useCallback(debounce(setfilterQuery, 1000), []);

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setfilterQueryWhitDebounce(event.target.value);
    setQuery(event.target.value);
  };

  const filteredPosts = useMemo(() => {
    return getFilteredPosts(posts, filterQuery);
  }, [posts, filterQuery]);

  return (
    <div className="container">
      {!isVisible
          && (
            <button
              type="button"
              className="button"
              onClick={loadPosts}
            >
              Load
            </button>
          )}
      {isLoading
        ? <div className="loader" />
        : (isVisible
          && (
            <>
              <div className="form__group field">

                <label htmlFor="fname">
                  Filter Posts:
                  <input
                    type="textarea"
                    id="fname"
                    name="firstname"
                    placeholder="Your filter..."
                    value={query}
                    onChange={handleChange}
                  />
                </label>

              </div>
              <PostList posts={filteredPosts} />
            </>
          )
        )}


    </div>
  );
};

export default App;
