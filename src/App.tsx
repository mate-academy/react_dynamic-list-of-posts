import React, { useState, useEffect } from 'react';
import './App.css';
import { getCommentsFromServer, getPostsFromServer, getUsersFromServer } from './api';
import { PostType, UserType, Comment } from './interfaces';
import { ListOfPosts } from './ListOfPosts';
import { debounce } from './helpers';


const App: React.FC<{}> = () => {
  const [loadButtonText, setLoadButtonText] = useState('Load');
  const [isLoadButtonVisible, setIsLoadButtonVisible] = useState(true);
  const [customisedPosts, setCustomisedPosts] = useState([]);
  const [filterFieldValue, setFilterFieldValue] = useState('');
  const [isFilterFieldVisible, setIsFilterFieldVisible] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);


  useEffect(() => {
    debounce(() => {
      setFilteredPosts(customisedPosts.filter((post: PostType) => {
        return (
          post.title.includes(filterFieldValue)
          || post.body.includes(filterFieldValue)
        );
      }));
    }, 1000);
  }, [filterFieldValue, customisedPosts]);


  const handleLoadButtonClick = (): void => {
    setLoadButtonText('Loading...');


    Promise.all([getCommentsFromServer(), getPostsFromServer(), getUsersFromServer()])
      .then(([commentsFromServer, postsFromServer, usersFromServer]) => {
        setCustomisedPosts(postsFromServer.map((post: PostType) => {
          return {
            ...post,
            user: usersFromServer.find((user: UserType) => user.id === post.userId),
            commentsList: commentsFromServer
              .filter((comment: Comment) => comment.postId === post.id),
          };
        }));
        setFilteredPosts(customisedPosts);
        setIsFilterFieldVisible(true);
        setIsLoadButtonVisible(false);
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
      {customisedPosts.length !== 0
        && (
          <ListOfPosts
            posts={filteredPosts}
          />
        )}
    </>
  );
};


export default App;
