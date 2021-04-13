import React from 'react';
import './PostsList.scss';
import { Post } from '../../types';

interface Props {
  posts: Post[],
  onPostSelect: (post: Post) => void,
  selectedPost: Post | null,
}

export const PostsList: React.FC<Props> = ({ posts, onPostSelect, selectedPost }) => {
  if (!posts.length) {
    return <h2>No posts</h2>
  }

  return (
    <div className="PostsList">
      <h2>Posts</h2>

      <ul>
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>[User {post.userId}]: </b>
              {post.title}
            </div>
            <button
              onClick={() => onPostSelect(post)}
              type="button"
              className="PostsList__button button"
            >
              {selectedPost && post.id === selectedPost.id ? `Close` : `Open`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
