import React, { FC, useState, ChangeEvent } from 'react';
import { getPosts, getUsers, getComments } from './api/api';
import { PostList } from './PostList/PostList';
import './App.css';

const App: FC = () => {
  const [posts, setPost] = useState<CompletedPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<CompletedPost[]>([]);
  const [searchString, setSearchString] = useState('');
  const [isLoading, setLoading] = useState(false);

  const loadPosts = () => {
    setLoading(true);
    Promise.all([
      getPosts(),
      getUsers(),
      getComments(),
    ])
      .then(([RawPosts, RawUsers, RawComments]) => {
        const preparedPosts = RawPosts.map((post) => ({
          ...post,
          user: RawUsers.find(person => person.id === post.userId) as User,
          comments: RawComments.filter(comment => comment.postId === post.id),
        }));

        setPost(preparedPosts);
        setFilteredPosts(preparedPosts);
      }).finally(() => setLoading(false));
  };

  const searchPosts = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchString(value);

    const string = value.toLowerCase().trim();

    if (string === '') {
      setFilteredPosts(posts);
    }

    if (string.length) {
      const serchedPosts = [...posts]
        .filter(post => post.title.includes(string)
        || post.body.includes(string));

      setFilteredPosts(serchedPosts);
    }
  };

  return (
    <div className="wrapper">
      {!posts.length ? (
        <div>
          <button type="button" onClick={() => loadPosts()}>
          Load data
          </button>
          {isLoading && <p>Loading...</p>}
        </div>
      )
        : (
          <>
            <input value={searchString} onChange={searchPosts} />
            <PostList listOfPosts={filteredPosts} />
          </>
        )}
    </div>
  );
};

export default App;
