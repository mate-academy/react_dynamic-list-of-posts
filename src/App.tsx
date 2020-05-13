import React, { useState, useEffect } from 'react';
import './App.css';
import { getCommentsFromServer, getPostsFromServer, getUsersFromServer } from './api';
import { PostType } from './interfaces';
import { ListOfPosts } from './ListOfPosts';
import { debounce } from './helpers';


const App: React.FC<{}> = () => {
  const [loadButtonText, setLoadButtonText] = useState('Load');
  const [isLoadButtonVisible, setIsLoadButtonVisible] = useState(true);
  const [comments, setComments] = useState([]);
  const [isCommentsLoaded, setIsCommentsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);
  const [filterFieldValue, setFilterFieldValue] = useState('');
  const [isFilterFieldVisible, setIsFilterFieldVisible] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);


  useEffect(() => {
    debounce(() => {
      setFilteredPosts(posts.filter((post: PostType) => {
        return (
          post.title.includes(filterFieldValue)
          || post.body.includes(filterFieldValue)
        );
      }));
    }, 1000);
  }, [filterFieldValue, posts]);


  const handleLoadButtonClick = (): void => {
    setLoadButtonText('Loading...');
    setIsLoadButtonVisible(false);
    setIsFilterFieldVisible(true);
    getCommentsFromServer().then((commentsFromServer) => {
      setComments(commentsFromServer);
      setIsCommentsLoaded(true);
    });

    getPostsFromServer().then(postsFromServer => {
      setPosts(postsFromServer);
      setIsPostsLoaded(true);
      setFilteredPosts(postsFromServer);
    });

    getUsersFromServer().then(usersFromServer => {
      setUsers(usersFromServer);
      setIsUsersLoaded(true);
    });
  };

  return (
    <>
      <h1>Dynamic list of posts</h1>
      <button
        type="button"
        className={isLoadButtonVisible ? '' : 'un-visible'}
        onClick={handleLoadButtonClick}
      >
        {loadButtonText}
      </button>
      <input
        placeholder="Enter text for filtering"
        type="text"
        value={filterFieldValue}
        onChange={(event) => {
          setFilterFieldValue(event.target.value);
        }}
        className={isFilterFieldVisible ? '' : 'un-visible'}
      />
      {isPostsLoaded
        && isCommentsLoaded
        && isUsersLoaded
        && (
          <ListOfPosts
            posts={filteredPosts}
            comments={comments}
            users={users}
          />
        )}
    </>
  );
};


export default App;
