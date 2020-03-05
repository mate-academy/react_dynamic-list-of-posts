import React, { FC, useState, ChangeEvent } from 'react';
import { getPosts, getUsers, getComments } from './api/api';
import { PostList } from './PostList/PostList';
import './App.css';

const App: FC = () => {
  const [listOfPosts, setPost] = useState<CompletedPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<CompletedPost[]>([]);
  const [query, setQuery] = useState('');
  const [isLoaded, setLoading] = useState(false);

  const loadPosts = () => {
    setLoading(true);
    Promise.all([
      getPosts(),
      getUsers(),
      getComments(),
    ])
      .then(([posts, users, comments]) => {
        const preperdPosts = posts.map((post) => ({
          ...post,
          user: users.find(person => person.id === post.userId) as User,
          comments: comments.filter(comment => comment.postId === post.id),
        }));

        setPost(preperdPosts);
        setFilteredPosts(preperdPosts);
      }).finally(() => setLoading(false));
  };

  const searchPosts = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setQuery(value);

    const string = value.toLowerCase().trim();

    if (string === '') {
      setFilteredPosts(listOfPosts);
    }

    if (string.length) {
      const serchedPosts = [...listOfPosts]
        .filter(post => post.title.includes(string)
        || post.body.includes(string));

      setFilteredPosts(serchedPosts);
    }
  };

  return (
    <div className="wrapper">
      {!listOfPosts.length ? (
        <div>
          <button type="button" onClick={() => loadPosts()}>
          Load data
          </button>
          {isLoaded && <p>Loading...</p>}
        </div>
      )
        : (
          <>
            <input value={query} onChange={searchPosts} />
            <PostList listOfPosts={filteredPosts} />
          </>
        )}
    </div>
  );
};

export default App;
