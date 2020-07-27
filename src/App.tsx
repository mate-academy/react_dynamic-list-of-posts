import React, { useState, useMemo } from 'react';
import { fetchData } from './modules/fetchData';
import { PostList } from './modules/postData/PostList';
import { PreparedPosts, User, Post, Comment } from './modules/interfaces';

import './App.css';
import { DownloadTask } from './modules/DownloadTask';

const App = () => {
  const [preparedPosts, setPreparedPosts] = useState<PreparedPosts[]>([]);
  const [isLoaded, setLoaded] = useState(false);
  const [buttonText, setButtonText] = useState('Download tasks');
  const [filterTitle, setFilterTitle] = useState('');

  async function getData() {
    const posts: Post[] = await fetchData('posts.json');
    const users: User[] = await fetchData('users.json');
    const comments: Comment[] = await fetchData('comments.json');

    setPreparedPosts(
      posts.map(post => ({
        ...post,
        user: users.find((person: any) => person.id === post.userId),
        comments: comments.filter((comment: any) => comment.postId === post.id),
      }) as PreparedPosts),
    );
    setLoaded(true);
  }

  const filteredPosts = useMemo(() => preparedPosts.filter(post => post.title.includes(filterTitle.trim())
    || post.body.includes(filterTitle.trim())),
  [filterTitle, preparedPosts]);

  if (!isLoaded) {
    return (
      <>
        <DownloadTask
          setButtonText={setButtonText}
          getData={getData}
          buttonText={buttonText}
        />
      </>
    );
  }

  if (isLoaded) {

    return (
      <>
        <input type="text"
          onChange={(event: any) => {
            setFilterTitle(event.target.value)
          }
        }
        />

        <PostList
          preparedPosts={filteredPosts}
        />
      </>
    );
  }

  return null;
};

export default App;
