import React, { useState, useCallback, useEffect } from 'react';
import './App.scss';
import debounce from 'lodash/debounce';
import LoadButton from './components/LoadButton';
import PostList from './components/PostList';
import {
  User, Post, Comment, PreparedPost,
} from './components/interfaces';

const App = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [preparedPosts, setPreparedPosts] = useState<PreparedPost[]>([]);
  const [search, setSearch] = useState<string>('');

  const COMMENTS_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/comments.json';
  const POSTS_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/posts.json';
  const USERS_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/users.json';

  const loadData = async <T extends {}>(url: string): Promise<T[]> => {
    const data = await fetch(url).then(response => response.json());

    return Promise.resolve(data);
  };

  const preparePosts = () => {
    const newPreparedPosts: PreparedPost[] = [];

    posts.forEach((post: Post) => {
      const preparedPost: PreparedPost = {
        post: { ...post },
        comments: comments.filter((comment: Comment) => comment.postId === post.id),
        user: { ...users.filter((user: User) => user.id === post.userId)[0] },
      };

      newPreparedPosts.push(preparedPost);
    });

    setPreparedPosts(newPreparedPosts);
  };

  const filterPosts = () => {
    return preparedPosts.filter((preparedPost: PreparedPost) => {
      if (preparedPost.post.title.includes(search) || preparedPost.post.body.includes(search)) {
        return true;
      }

      return false;
    });
  };

  const filterPostsWithDebounce = useCallback(
    debounce(setSearch, 1000),
    [],
  );

  const onLoadData = async () => {
    setLoading(true);

    Promise.all([
      setComments(await loadData<Comment>(COMMENTS_URL)),
      setPosts(await loadData<Post>(POSTS_URL)),
      setUsers(await loadData<User>(USERS_URL)),
    ])
      .then(() => {
        setLoaded(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    preparePosts();
    // eslint-disable-next-line
  }, [loaded]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    filterPostsWithDebounce(event.target.value);
  };

  return (
    <>
      <h1>Dynamic list of posts</h1>
      <input type="text" onChange={handleSearch} />
      {loaded && !loading
        ? (
          <ul>
            {filterPosts().map((preparedPost: PreparedPost) => {
              return (
                <PostList key={preparedPost.post.id} preparedPost={preparedPost} />
              );
            })}
          </ul>
        )
        : (
          <LoadButton
            loading={loading}
            onLoadData={onLoadData}
          />
        )}
    </>
  );
};

export default App;
