import React, { useState } from 'react';
import './App.scss';
import {
  getComments, getPosts, getUsers, Posts,
} from './helpers/api';
import { LoadingSpinner } from './loading-spinner';

const App = () => {
  const [post, setPost] = useState<Posts[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sortedPosts, setSortedPosts] = useState<Posts[]>([]);

  const handleLoad = async () => {
    setIsLoading(true);
    try {
      const postsFromServer = await getPosts();
      const usersFromServer = await getUsers();
      const commentsFromServer = await getComments();

      const allPosts = postsFromServer.map(newPost => ({
        ...newPost,
        user: usersFromServer.find(user => user.id === newPost.userId),
        comments: commentsFromServer.filter(comment => comment.postId === newPost.id),
      }));

      setPost(allPosts);
      setIsLoaded(true);
      setSortedPosts(allPosts);
    } catch (e) {
      setErrorMessage('Loading from server terminated. Please try again later');
    }

    setIsLoading(false);
  };

  const sortPosts = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortedPosts(post.filter(el => ((el.title + el.body)
      .toLocaleLowerCase()
      .includes((event.target.value)
        .toLocaleLowerCase()))));
  };

  return (
    <div className="main">
      <h1 className="main__header">Dynamic list of posts</h1>
      {!isLoaded ? (
        <>
          {!isLoading
            ? (
              <button className="main__load-button" disabled={isLoading} type="button" onClick={handleLoad}>
                Load
              </button>
            )
            : <LoadingSpinner /> }
          {errorMessage && <span className="error__message">{errorMessage}</span>}
        </>
      )
        : (
          <>
            <input className="searchbar" type="text" onChange={event => sortPosts(event)} placeholder="Search" />
            <ul>
              {sortedPosts.map(newPost => (
                <li key={newPost.id} className="post">
                  <div className="post__title">{newPost.title}</div>
                  <div className="post__body">{newPost.body}</div>
                  <div className="post__user-wrapper">
                    <div className="post__user">
                      <div className="post__user_name">
                        Name:
                        {' '}
                        {newPost.user ? newPost.user.name : 'guest user'}
                      </div>
                      <div className="post__user_email">
                        E-mail:
                        {' '}
                        {newPost.user ? newPost.user.email : 'no e-mail'}
                      </div>
                    </div>
                    <div className="post__user_address">
                      <div className="post__user_address-city">
                        City:
                        {' '}
                        {newPost.user ? newPost.user.address.city : '-'}
                      </div>
                      <div className="post__user_address-street">
                        Street:
                        {' '}
                        {newPost.user ? newPost.user.address.street : '-'}
                      </div>
                      <div className="post__user_address-zip">
                        Zip-code:
                        {' '}
                        {newPost.user ? newPost.user.address.zipcode : '-'}
                      </div>
                    </div>
                  </div>
                  {newPost.comments?.map(comment => (
                    <div id={String(comment.id)} className="post__comment">
                      <span className="post__comment_header">{comment.name}</span>
                      <span className="post__comment_title">{comment.body}</span>
                      <span className="post__comment_email">{comment.email}</span>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </>
        )}
    </div>
  );
};

export default App;
