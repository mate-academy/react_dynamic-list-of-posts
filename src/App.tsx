import React, { FC, useState } from 'react';
import { getPosts, getUsers, getComments } from './api/fetchData';
import './App.scss';
import { PostList } from './components/postList/PostList';

export const App: FC = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');

  const loadPosts = async () => {
    setIsLoading(true);

    const postsFromApi = await getPosts();
    const usersFromApi = await getUsers();
    const commentsFromApi = await getComments();

    setPosts(postsFromApi.map(post => ({
      ...post,
      user: usersFromApi.find(user => user.id === post.userId) as User,
      comments: commentsFromApi.filter(comment => comment.postId === post.id),
    })));

    setIsLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const filteredPosts = posts.filter(post => (
    post.title.toLowerCase().includes(text)
    || post.body.toLowerCase().includes(text)
  ));

  if (!posts.length) {
    return (
      <div className="wrapper">
        {isLoading
          ? (
            <>
              <button
                type="button"
                onClick={loadPosts}
                className="waves-effect waves-light btn"
              >
                {isLoading ? 'Loading...' : 'Load'}
              </button>
              <div className="progress">
                <div className="indeterminate" />
              </div>
            </>
          )
          : (
            <button
              type="button"
              onClick={loadPosts}
              className="waves-effect waves-light btn"
            >
              {isLoading ? 'Loading...' : 'Load'}
            </button>
          )}
      </div>
    );
  }

  return (
    <div className="wrapper">
      <input
        type="text"
        placeholder="Find by Title or Description"
        onChange={handleChange}
      />
      <div className="wrapper--post">
        <PostList posts={filteredPosts} />
      </div>
    </div>
  );
};
