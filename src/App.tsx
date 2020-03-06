import React, {
  FC, useState, useMemo, ChangeEvent,
} from 'react';
import {
  Post, User, Comment, CompletePost,
} from './types';
import { loadPosts, loadUsers, loadComments } from './loadData';
import { PostList } from './components/PostList/PostList';
import './App.css';

const App: FC = () => {
  const [posts, setPosts] = useState<CompletePost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  const handleLoadPosts = () => {
    setIsLoading(true);

    Promise.all([
      loadPosts,
      loadUsers,
      loadComments,
    ])
      .then(([
        postsFromApi,
        usersFromApi,
        commentsFromApi,
      ]) => {
        const completePost = postsFromApi.map((post: Post) => {
          const user = usersFromApi.find(
            (person: User) => post.userId === person.id,
          ) as User;
          const comments = commentsFromApi.filter(
            (comment: Comment) => post.id === comment.postId,
          ) as Comment[];

          return { ...post, user, comments };
        });

        setPosts(completePost);
        setIsLoading(false);
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
  };

  const filteredPosts = useMemo<CompletePost[]>(() => {
    const filterValue = query.toLowerCase();

    return posts.filter(post => (post.title.toLowerCase().includes(filterValue))
      || (post.body.toLowerCase().includes(filterValue)));
  }, [query, posts]);

  return (
    <>
      <h1>Dynamic list of posts</h1>
      {
        posts.length
          ? (
            <div className="app">
              <input
                className="input"
                type="text"
                placeholder="Serch the post"
                value={query}
                onChange={(event) => handleChange(event)}
              />
              <PostList
                posts={query ? filteredPosts : posts}
              />
            </div>
          )
          : (
            <button
              className="button"
              type="button"
              onClick={handleLoadPosts}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load Posts'}
            </button>
          )
      }
    </>
  );
};

export default App;
