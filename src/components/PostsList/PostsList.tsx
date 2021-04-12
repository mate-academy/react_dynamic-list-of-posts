import React from 'react';
import './PostsList.scss';
import { Post } from '../../types';
import { number } from 'prop-types';

interface Props {
  posts: Array<Post>,
  onCommentSelect: (id: number) => void,
  selectedPostId: number,
}

export const PostsList: React.FC<Props> = ({ posts, onCommentSelect, selectedPostId }) => {
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
              onClick={() => onCommentSelect(post.id)}
              type="button"
              className="PostsList__button button"
            >
              {post.id === selectedPostId ? `Close` : `Open`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
