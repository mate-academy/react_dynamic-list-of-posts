import React, { useState, FC } from 'react';
import { getData } from './api/getDataFromServer';
import { PostsList } from './components/PostList/PostsList';
import './App.css';

const API_URL_POST = 'https://jsonplaceholder.typicode.com/posts';
const API_URL_USER = 'https://jsonplaceholder.typicode.com/users';
const API_URL_COMMENT = 'https://jsonplaceholder.typicode.com/comments';

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [postList, setPostList] = useState<PrepearedUser[]>([]);

  const loadData = () => {
    const PostsPromise = getData<Post[]>(API_URL_POST);
    const UsersPromise = getData<User[]>(API_URL_USER);
    const CommentsPromise = getData<Comment[]>(API_URL_COMMENT);

    setIsLoading(true);

    Promise.all([PostsPromise, UsersPromise, CommentsPromise])
      .then(([posts, users, comments]) => {
        const preparedPosts = posts.map(post => (
          {
            ...post,
            user: users.find(user => user.id === post.userId) as User,
            comments: comments.filter(comment => comment.postId === post.id),
          }
        ));

        setPostList(preparedPosts);
        setButtonVisible(false);
        setIsLoading(false);
      });
  };

  return (
    <>
      {
        buttonVisible
          ? (
            <button
              type="button"
              onClick={loadData}
              disabled={isLoading}
              className="load-btn"
            >
              Load
            </button>
          )
          : <PostsList postList={postList} />
      }
      {isLoading && (
        <p className="loading-text">Loading...</p>
      )}
    </>
  );
};

export default App;
