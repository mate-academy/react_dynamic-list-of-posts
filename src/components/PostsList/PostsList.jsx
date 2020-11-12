import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import cn from 'classnames';
import './PostsList.scss';

export const PostsList = ({ selectedUserId, selectPostId, selectedPostId }) => {

  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    loadPosts();
  }, [selectedUserId])

  const loadPosts = async() => {
    const postsFromServer = await getUserPosts(selectedUserId);
    setPosts(postsFromServer);
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map( post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>[User #{post.userId}]: </b>
              {post.title}
            </div>
            <button
              onClick={()=>selectPostId(post.id)}
              type="button"
              className={cn('PostsList__button button', {
                'button--is-active': post.id === selectedPostId,
              })}
            >
              {post.id === selectedPostId ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
};
