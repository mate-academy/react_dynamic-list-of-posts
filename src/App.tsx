import React, { useState, FC } from 'react';
import { getData } from './api/getDataFromServer';
import { PostsList } from './components/PostList/PostsList';
import './App.css';

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [postList, setPostList] = useState<PrepearedUser[]>([]);

  const loadData = () => {
    const PostsPromise = getData<Post[]>('https://jsonplaceholder.typicode.com/posts');
    const UsersPromise = getData<User[]>('https://jsonplaceholder.typicode.com/users');
    const CommentsPromise = getData<Comment[]>('https://jsonplaceholder.typicode.com/comments');

    setIsLoading(true);

    Promise.all([PostsPromise, UsersPromise, CommentsPromise])
      .then(response => {
        const preparedPosts = response[0].map(post => (
          {
            ...post,
            user: response[1].find(user => user.id === post.userId) as User,
            comments: response[2].filter(comment => comment.postId === post.id),
          }
        ));

        setButtonVisible(false);
        setIsLoading(false);
        setPostList(preparedPosts);
      });
  };

  return (
    <>
      {
        buttonVisible
          ? <button type="button" onClick={loadData}>Load</button>
          : <PostsList postList={postList} />
      }
      {isLoading && (
        <p>Loading ...</p>
      )}
    </>
  );
};

export default App;
