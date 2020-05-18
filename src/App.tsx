import React, { useState } from 'react';
import './App.css';
import _ from 'lodash';
import PostList from './components/PostList';
import { getPosts, getUsers, getComments } from './helpers/api';
import PostSearch from './components/PostSearch';


const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [initPosts, setInitPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadPosts = () => {
    setIsLoading(true);
    const postsPromise = getPosts();
    const usersPromise = getUsers();
    const commentsPromise = getComments();

    Promise.all([postsPromise, usersPromise, commentsPromise])
      .then(([postsFromServer, usersFromServer, commentsFromServer]) => {
        const preparedPostsList = postsFromServer.map(post => {
          return {
            ...post,
            user: usersFromServer
              .find(user => user.id === post.userId),
            comments: commentsFromServer
              .filter(comment => comment.postId === post.id),
          };
        });

        setPosts(preparedPostsList);
        setInitPosts(preparedPostsList);
        setIsLoading(false);
        setIsLoaded(true);
      });
  };

  const postsSearchFilter = _.debounce((searchQuery: string) => {
    if (searchQuery === '') {
      setPosts(initPosts);
    } else {
      const regExp = new RegExp(searchQuery);

      setPosts(initPosts.filter(post => {
        return post.title.match(regExp) || post.body.match(regExp);
      }));
    }
  }, 300);

  return (
    <div className="posts">
      {!isLoaded && (
        <button
          className="posts__button"
          type="button"
          onClick={handleLoadPosts}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      )}
      {isLoaded && (
        <>
          <PostSearch postsSearchFilter={postsSearchFilter} posts={posts} />
          <PostList posts={posts} />
        </>
      )}
    </div>
  );
};

export default App;
