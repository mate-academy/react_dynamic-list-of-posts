import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  selectPost,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>{`[User #${post.userId}:]`}</b>
            {post.title}
          </div>
          {selectedPost === post.id
            ? (
              <button
                type="button"
                className="PostList__button button"
                onClick={() => selectPost(0)}
              >
                close
              </button>
            )
            : (
              <button
                type="button"
                className="PostList__button button"
                onClick={() => {
                  selectPost(post.id);
                }}
              >
                open
              </button>
            )}
        </li>
      ))}
    </ul>
  </div>
);

interface Props {
  posts: Post[],
  selectedPost: number,
  selectPost: (postId: number) => void,
}
