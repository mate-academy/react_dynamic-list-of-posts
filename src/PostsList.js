import React, { useState } from 'react';
import Post from './Post';
import './App.css';
import { getPosts, getUsers, getComments } from './postsApi';

function PostsList() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const [preparedPosts, setPreparedPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const showPreparedPosts = async() => {
    setIsLoading(true);
    const [listOfPosts, listOfUsers, listOfComments] = await Promise
      .all([getPosts(), getUsers(), getComments()]);
    const mergedPosts = listOfPosts.map((post) => {
      const user = listOfUsers
        .find(person => person.id === post.userId);
      const postComments = listOfComments
        .filter(comment => comment.postId === post.id);

      return {
        ...post,
        user,
        postComments,
      };
    });

    setPreparedPosts(mergedPosts);
    setIsLoading(false);
    setIsShown(false);
  };

  const handleChange = (value) => {
    setSearchTerm(
      value.trim().toLowerCase()
    );
  };

  const debounce = (f, delay) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => f(...args), delay);
    };
  };

  const debouncedHandleChange = debounce(handleChange, 1000);

  const filteredPost = !searchTerm
    ? preparedPosts
    : preparedPosts
      .filter(post => post.title.toLowerCase()
        .includes(searchTerm)
            || post.body.toLowerCase()
              .includes(searchTerm));

  return (
    <div className="App">
      {
        isShown ? (
          <button
            type="button"
            className="init-button"
            onClick={() => {
              showPreparedPosts();
            }}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        ) : (
          <>
            <input
              type="text"
              className="post-list__searchInput"
              placeholder="Search"
              onChange={e => debouncedHandleChange(e.target.value)}
            />
            {
              (
                <span className="post-list__post-count">
                  {`${filteredPost.length}
                  ${filteredPost.length === 1 ? 'post' : 'posts'} found`}
                </span>
              )
            }
            <article className="post-list">

              {filteredPost.map(post => (
                <section
                  className="post-list__post"
                  key={post.id}
                >
                  <Post postElems={post} />
                </section>
              ))}
            </article>
          </>
        )
      }
    </div>
  );
}

export default PostsList;
