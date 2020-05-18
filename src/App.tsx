import React, { useState} from 'react';
import { getUsers, getPosts, Post, getComments } from './helper/api';
import debounce from 'lodash/debounce';
import './App.css';

const postsFromFiler = (posts: Post[], qery: string) =>{
  return posts.filter( post => post.title.includes(qery) || post.body.includes(qery))
}

const App = () => {
  const [posts, setPost] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [qery, setQery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
const setFilterQueryDebounce = debounce(setFilterQuery, 1000)

  const handleLoadClick = async () => {
    setIsLoading(true);

    const postsFromServer = await getPosts();
    const usersFromServer = await getUsers();
    const commentsFromServer = await getComments();

    const fullPost = postsFromServer.map(post => ({
      ...post,
      comments: commentsFromServer.filter(comment => comment.postId === post.id),
      user: usersFromServer.find(user => user.id === post.userId),

    }));

    setPost(fullPost);
  };

  return (
    <>
    <div>
      <h1>Dynamic list of TODOs</h1>

      {posts.length === 0 ? (
        <button type="button" onClick={handleLoadClick} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      ) : (
        <>
        <input
          className= "search"
          type="text"
          value={qery}
          onChange={(event) => {setQery(event.target.value);
            setFilterQueryDebounce(event.target.value)}
          }
        />
        <div className="post-container">
          {postsFromFiler(posts, filterQuery).map(post =>
            <div  className="post" key={post.id}>
              <h2 className="post_title">{post.title}</h2>
              <p className="post_name_user">{post.user?.name}</p>
              <p className="post_body">{post.body}</p>
              <ul className="comment-container">
                {post.comments?.map(c =>
                <li className="comment">
                  <h4 className="comment_name">{c.name}</h4>
                  <a href={`mailto:${c.email}`} className="comment_email">{c.email}</a>
                  <p className="comment_body">{c.body}</p>
                </li>)}
              </ul>
            </div>
          )}
        </div>
        </>
      )}
    </div>

      </>
  );
};

export default App;
