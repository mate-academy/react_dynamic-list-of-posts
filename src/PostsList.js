import React, { useState } from 'react';
import Post from './Post';
import './App.css';
import { getPosts, getUsers, getComments } from './postsApi';

function PostsList() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const [preparedPosts, setPreparedPosts] = useState([]);

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

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPost = !searchTerm
    ? preparedPosts
    : preparedPosts
      .filter(post => post.title.toLowerCase()
        .includes(searchTerm.toLowerCase())
            || post.body.toLowerCase()
              .includes(searchTerm.toLowerCase()));

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
              value={searchTerm}
              onChange={handleChange}
            />
            {
              (filteredPost.length === 1)
                ? (
                  <span className="post-list__post-count">
                    {`${filteredPost.length} post found`}
                  </span>
                )
                : (
                  <span className="post-list__post-count">
                    {`${filteredPost.length} posts found`}
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
