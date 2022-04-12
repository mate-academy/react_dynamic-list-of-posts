import React from 'react';
import './PostsList.scss';

interface Props {
  posts: Post[];
  onSetSelectedPost: (newSelectedPostId: number | null) => void;
  selectedPostId: number | null;
}

export const PostsList: React.FC<Props> = ({ posts, onSetSelectedPost, selectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>
              [User #
              {post.userId}
              ]:
              {' '}
            </b>
            {post.title}
          </div>
          {
            selectedPostId === post.id
              ? (
                <button
                  onClick={() => onSetSelectedPost(null)}
                  type="button"
                  className="PostsList__button button"
                >
                  Close
                </button>
              )
              : (
                <button
                  onClick={() => onSetSelectedPost(post.id)}
                  type="button"
                  className="PostsList__button button"
                >
                  Open
                </button>
              )
          }
        </li>
      ))}
    </ul>
  </div>
);
