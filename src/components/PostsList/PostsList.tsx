/* eslint-disable no-console */
import React from 'react';
import './PostsList.scss';

interface Props {
  posts: Post[],
  selectedPostId: number,
  onTogglePostDetails: (postId: number) => void,
}

export const PostsList: React.FC<Props> = ({ posts, selectedPostId, onTogglePostDetails }) => (
  <div className="PostsList">
    <h2>Posts:</h2>
    {console.log('PostList', posts)}

    <ul className="PostsList__list">
      {posts.length && posts.map((post: Post) => {
        const isSelectedPost = post.id === selectedPostId;

        return (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>

            <button
              type="button"
              className="PostsList__button button"
              onClick={() => (isSelectedPost
                ? onTogglePostDetails(0)
                : onTogglePostDetails(post.id))}
            >
              {isSelectedPost ? 'Close' : 'Open'}
            </button>
          </li>
        );
      })}
    </ul>
  </div>
);
