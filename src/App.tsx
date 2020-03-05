import React, { FC, useState, ChangeEvent } from 'react';
import './App.css';
import { PostList } from './components/PostList';
import { getPosts, getUsers, getComments } from './api/getData';
import { Search } from './components/Search';
import { LoadButton } from './components/LoadButton';
import { LoaderContainer } from './components/LoaderContainer';

const filterPosts = (query: string, array: PreparedPost[]): PreparedPost[] => {
  const queryToLowerCase = query.toLowerCase();

  return array.filter(item => item.title.toLowerCase().includes(queryToLowerCase)
        || item.body.toLowerCase().includes(queryToLowerCase));
};

export const App: FC = () => {
  const [posts, setPosts] = useState<PreparedPost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredPosts, setfilteredPosts] = useState<PreparedPost[]>([]);

  const handleLoad = async () => {
    setIsLoaded(true);
    setIsLoading(true);
    const [postsFromServer,
      usersFromServer,
      commentsFromServer]
          = await Promise.all(
            [getPosts(),
              getUsers(),
              getComments(),
            ],
          );

    setPosts(postsFromServer.map(post => ({
      ...post,
      user: usersFromServer.find(user => user.id === post.userId) as UserInterface,
      comments: commentsFromServer.filter(comment => comment.postId === post.id),
    })));

    setfilteredPosts(postsFromServer.map(post => ({
      ...post,
      user: usersFromServer.find(user => user.id === post.userId) as UserInterface,
      comments: commentsFromServer.filter(comment => comment.postId === post.id),
    })));

    setIsLoading(false);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
    setfilteredPosts(filterPosts(e.target.value, [...posts]));
  };

  return (
    <>
      {isLoaded && <Search query={query} handleSearch={handleSearch} /> }
      {!isLoaded && <LoadButton handleLoad={handleLoad} />}
      {isLoaded && <PostList posts={filteredPosts} />}
      {isLoading && <LoaderContainer />}
    </>
  );
};
