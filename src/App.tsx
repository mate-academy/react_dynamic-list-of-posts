import React, { useState } from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import PostList from './components/PostList';
import { getPosts } from './api/getPosts';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setLoaded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState('');
  // const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    setLoading(true);

    try {
      const data = await getPosts();

      setPosts(data);
      setLoading(false);
      setLoaded(true);
    } catch (error) {
      setLoading(false);
      setError(`Something went wrong! ${error.message}`);
    }
  };

  return (
    <Container className="page">
      <Header as="h1" className="page__title" color="blue">
        Static list of posts
      </Header>
      {isLoaded ? (
        <PostList list={posts} />
      ) : (
        <>
          <Header as="h2" color="red">{isError}</Header>
          <Button
            className="page__btn"
            loading={isLoading}
            content="Load TodoList"
            color="blue"
            size="big"
            onClick={loadData}
          />
        </>
      )}
    </Container>
  );
};

export default App;
