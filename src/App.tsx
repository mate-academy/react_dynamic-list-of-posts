import React, { useState } from 'react';
import './App.css';

import
{
  getPosts,
  getUsers,
  getComments,
  Post,
}
  from './helpers/api';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadClick = async () => {
    setIsLoading(true);

    const postsFromServer = await getPosts();
    const usersFromServer = await getUsers();
    const commentsFromServer = await getComments();

    const postsWithComments = postsFromServer.map(item => (
      {
        ...item,
        user: usersFromServer.find(person => (person.id === item.userId)),
        comments: commentsFromServer.filter(comment => comment.postId === item.id),
      }
    ));

    setPosts(postsWithComments);
  };

  return (
    <div className="App">
      <h1 className="title">Dynamic list of posts</h1>
      {!posts.length ? (
        <button className="btn load-btn" type="button" onClick={handleLoadClick} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      ) : (
        <>
          <ul className="post-list">
            {posts.map(post => (
              <li className="post-card">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <div>
                  <h3>User: </h3>
                  <p className="user__name">{post.user?.name}</p>
                  <div>
                    <span className="bold-font">User-email: </span>
                    {post.user?.email}
                  </div>
                  <address>
                    <span className="bold-font">User-address: </span>
                    {
                      `${post.user?.address.suite},
                  ${post.user?.address.street},
                  ${post.user?.address.city}`
                    }
                  </address>
                </div>
                <p>
                  <span className="comments__heading">Comments: </span>
                  {post.comments?.map(c => (
                    <section className="post__comment" key={c.id}>
                      <div className="comments">
                        <p className="bold-font">{c.name}</p>
                        <p>{c.body}</p>
                        <p className="email">{c.email}</p>
                      </div>
                    </section>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
