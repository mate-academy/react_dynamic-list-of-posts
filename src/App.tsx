import React, { useMemo, useState } from 'react';
import './App.scss';
import {
  getComments, getPosts, getUsers, Post,
} from './helpers/api';
import { PostList } from './helpers/postList';
import { Button } from './helpers/button';


const App = () => {
  const [postsList, setPostList] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState('');

  const handleLoad = async () => {
    setIsLoading(true);
    try {
      const postsFromServer = await getPosts();
      const usersFromServer = await getUsers();
      const commentsFromServer = await getComments();

      const allPosts = postsFromServer.map(newPost => ({
        ...newPost,
        user: usersFromServer.find(user => user.id === newPost.userId),
        comments: commentsFromServer.filter(comment => comment.postId === newPost.id),
      }));

      setPostList(allPosts);
      setIsLoaded(true);
    } catch (e) {
      setErrorMessage('Loading from server terminated. Please try again later');
    }

    setIsLoading(false);
  };

  const getSortedPostList = (list: Post[], qry: string) => (
    list.filter((el: { title: string; body: string }) => (el.title + el.body)
      .toLocaleLowerCase().includes(qry.toLocaleLowerCase()))
  );

  const sortedPosts = useMemo(
    () => getSortedPostList(postsList, query),
    [query, postsList],
  );

  return (
    <div className="main">
      <h1 className="main__header">Dynamic list of posts</h1>
      {!isLoaded
        ? (
          <Button isLoading={isLoading} handleLoad={handleLoad} errorMessage={errorMessage} />
        )
        : (
          <PostList setQuery={setQuery} query={query} sortedPosts={sortedPosts} />
        )}
    </div>
  );
};

export default App;
