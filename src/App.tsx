import React, { useState, useMemo } from 'react';
import './App.css';
import { getData } from './api/getData';
import { Post, User, Comment } from './components/Interfaces';
import { PostsList } from './components/PostsList';

const API = {
  POSTS: 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/posts.json',
  USERS: 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/users.json',
  COMMENTS: 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/comments.json',
};

export const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const loadPosts = () => {
    setLoading(true);

    getData<User>(API.USERS)
      .then((usersFromServer: User[]) => {
        setUsers(usersFromServer);
      });

    getData<Post>(API.POSTS)
      .then((postsFromServer: Post[]) => {
        setPosts(postsFromServer);
      });

    getData<Comment>(API.COMMENTS)
      .then((commentsFromServer: Comment[]) => {
        setComments(commentsFromServer);
      });

    setLoading(false);
  };

  const filterPosts = useMemo<Post[]>(() => {
    if (query !== '') {
      const pattern = new RegExp(query, 'ig');

      return posts.filter((post: Post) => (
        pattern.test(post.title) || pattern.test(post.body)
      ));
    }

    return [...posts];
  }, [query, posts]);

  const handleChange = (value: string) => {
    setQuery(value);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (posts.length === 0) {
    return (
      <button
        type="button"
        onClick={loadPosts}
      >
        Load posts
      </button>
    );
  }

  return (
    <div className="app">
      <span>Search:</span>
      <input
        type="text"
        value={query}
        onChange={(event) => handleChange(event.target.value)}
      />
      <PostsList
        users={users}
        comments={comments}
        posts={filterPosts}
      />
    </div>
  );
};
