import React,{ useState } from 'react';
import { getPostDetails } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({ posts, changePost }) => {
  const [currentPostId, setCurrentPostId] = useState(0);

  const changeSelectedPost = async (id) => {
    const post = await getPostDetails(id);

    changePost(post);
    setCurrentPostId(id);
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
  
      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>[User #{post.userId}]: </b>
              {post.title}
            </div>
            <button
              onClick={
                currentPostId === post.id
                  ? () => changeSelectedPost(0)
                  : () => changeSelectedPost(post.id)
              }
              type="button"
              className="PostsList__button button"
            >
              {currentPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
