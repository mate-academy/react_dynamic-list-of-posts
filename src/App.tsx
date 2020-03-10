import React, { FC, useState, useMemo } from 'react';
import './App.css';
import { getData } from './api';
import { PostsList } from './components/PostsList/PostsList';

export const App: FC = () => {
  const [findQuery, setFindQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PreparedPost[]>([]);

  const loadPosts = async () => {
    setLoading(true);

    const [
      loadedPosts,
      loadedUsers,
      loadedComments,
    ] = await Promise.all([
      getData<Post[]>('posts'),
      getData<User[]>('users'),
      getData<Comment[]>('comments'),
    ]);

    setPosts(loadedPosts.map((post) => ({
      ...post,
      user: loadedUsers.find(user => user.id === post.userId) as User,
      comments: loadedComments.filter(comment => comment.postId === post.id),
    })));

    setLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFindQuery(event.target.value.toLocaleLowerCase());
  };

  const filteredPost = useMemo(
    () => (
      posts.filter(post => (
        post.title.toLowerCase().includes(findQuery)
        || post.body.toLowerCase().includes(findQuery)
      ))
    ),
    [findQuery, posts],
  );

  if (posts.length === 0) {
    return (
      <>
        <button
          type="button"
          className="app__load-btn"
          onClick={loadPosts}
          disabled={isLoading}
        >
          Load Posts
        </button>
        {isLoading && (
          <div className="app__loader loader">
            <img
              className="loader__gif"
              src="https://www.eventbus.nz/wp-content/themes/eventbus/assets/images/widget-loader-lg-en.gif"
              alt="Loading..."
            />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="wrapper">
      <div className="post-finder">
        <input
          type="text"
          onChange={handleChange}
          className="post-finder__input"
          placeholder="Find post by body ot title"
        />
      </div>
      <PostsList
        posts={filteredPost}
      />
    </div>
  );
};
