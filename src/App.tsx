import React, { useState, FC } from 'react';
import { getData } from './api/getDataFromServer';
import { PostsList } from './components/PostList/PostsList';
import './App.css';

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [postList, setPostList] = useState<PrepearedPost[]>([]);

  const loadData = () => {
    const PostsPromise = getData<Post[]>('posts');
    const UsersPromise = getData<User[]>('users');
    const CommentsPromise = getData<Comment[]>('comments');

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
