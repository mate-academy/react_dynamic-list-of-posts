import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { getPosts } from './api/posts';
import postsImages from './posts_images.json';
import usersImage from './usersImages.json';
import usersFromApi from './api/users.json';
import './App.scss';
import { Carousel } from './components/Carousel';
import { PostsList } from './components/PostsList';
import { Paginator } from './components/Paginator';
import { Popup } from './components/Popup';

const App = () => {
  const [state, setState] = useState({
    users: [],
    posts: [],
    total: 0,
    perPage: 6,
    currentPage: 1,
    currentUser: null,
    isActive: true,
  });

  const [postsForDisplay, setPostsForDisplay] = useState([]);
  const [postDetails, setPostDetails] = useState({});

  const { users, posts, currentPage, perPage, currentUser, isActive } = state;

  const handleSetState = (name, value) => {
    if (name === 'currentUser') {
      setState(prevState => ({
        ...prevState, currentPage: 1, isActive: false,
      }));
    }

    if (name === 'isActive') {
      setState(prevState => ({
        ...prevState,
        currentPage: 1,
      }));
    }

    setState(prevState => ({
      ...prevState,
      [name]: Number.isInteger(value) ? +value : value,
    }));
  };

  useEffect(() => {
    const usersList = usersFromApi.map((user) => {
      const image = usersImage.find(obj => obj[user.id])[user.id];

      return {
        ...user, image,
      };
    });

    getPosts()
      .then(postsList => setState(prevState => ({
        ...prevState, users: usersList, posts: postsList, total: posts.length,
      })));
  }, []);

  useEffect(() => {
    if (isActive) {
      setPostsForDisplay(posts);

      return;
    }

    setPostsForDisplay(posts.filter(post => post.userId === currentUser.id));
  }, [posts, isActive, currentUser]);

  const startIndex = currentPage * perPage - perPage;
  const stopIndex = currentPage * perPage;

  return (!!postsForDisplay.length
    && (
    <div className="App">
      <header className="App__header" />

      <main className="App__main">
        <Carousel
          users={users}
          callBack={handleSetState}
        />

        {
          postsForDisplay.length
          && (
          <>
            <div className="posts-container">
              <div className="buttons-container">
                <button
                  type="button"
                  className={classNames(
                    'button-posts',
                    { 'button-posts__active': isActive },
                  )}
                  disabled={isActive}
                  onClick={() => {
                    handleSetState('isActive', true);
                  }}
                >
                  ALL POSTS
                </button>
                {currentUser
                  && (
                  <button
                    type="button"
                    className={classNames(
                      'button-posts',
                      'button-posts__user',
                      { 'button-posts__active': !isActive },
                    )}
                    disabled={!isActive}
                    onClick={() => {
                      handleSetState('isActive', false);
                    }}
                  >
                    {`Posts of: ${currentUser.name}`}
                  </button>
                  )
                }
              </div>

              <PostsList
                startIndex={startIndex}
                stopIndex={stopIndex}
                images={postsImages}
                users={users}
                posts={postsForDisplay.slice(startIndex, stopIndex)}
                callBack={setPostDetails}
              />
            </div>
            {
              !!Object.keys(postDetails).length
              && (
              <div
                role="link"
                styling="link"
                aria-hidden
                className="popup"
                onClick={(event) => {
                  if (event.target === event.currentTarget) {
                    setPostDetails({});
                  }
                }}
              >
                <Popup
                  {...postDetails}
                  callBack={setPostDetails}
                />
              </div>
              )
            }

            <Paginator
              total={postsForDisplay.length}
              perPage={6}
              currentPage={currentPage}
              handleChange={handleSetState}
            />
          </>
          )
        }

      </main>
    </div>
    )
  );
};

export default App;
