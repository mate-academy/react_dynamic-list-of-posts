import React, {useState, useMemo, useCallback} from 'react';
import { getUsers, getPosts, Post, getComments } from './helper/api';
import debounce from 'lodash/debounce';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

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

    setPosts(fullPost);
  };
  
  const setFilterQueryDebounce = useCallback(
    debounce(setFilterQuery, 1000),
    []
    );

  const visibleTodos = useMemo(() => {
    const postsFromFilter = (posts: Post[], query: string) =>{
      return posts.filter( post => post.title.includes(query) || post.body.includes(query))
    }
    return postsFromFilter(posts, filterQuery);
   }, [posts, filterQuery]);

  return (
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
          value={query}
          onChange={({target:{value}}) => {
            setQuery(value);
            setFilterQueryDebounce(value)
          }
          }
        />
        <div className="post-container">
          {visibleTodos
            .map(({id,user,title,body,comments}) =>
            <div  className="post" key={id}>
              <h2 className="post_title">{title}</h2>
              <p className="post_name_user">{user?.name}</p>
              <p className="post_body">{body}</p>
              <ul className="comment-container">
                {comments?.map(({name,email,body}) =>
                <li className="comment">
                  <h4 className="comment_name">{name}</h4>
                  <a href={`mailto:${email}`} className="comment_email">{email}</a>
                  <p className="comment_body">{body}</p>
                </li>)}
              </ul>
            </div>
          )}
        </div>
        </>
      )}
    </div>
  );
};

export default App;
