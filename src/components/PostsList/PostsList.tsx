import React from 'react';
import { Post } from '../../types/types';
import './PostsList.scss';

interface Props {
  posts: Post[];
  selectedPostId: number;
  setSelectedPostId: (id: number) => void;
}

export const PostsList: React.FC<Props> = (props) => {
  const { posts, selectedPostId, setSelectedPostId } = props;

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map((post: Post) => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]`}</b>
              {post.body}
            </div>

            {selectedPostId === post.id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  setSelectedPostId(0);
                }}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  setSelectedPostId(post.id);
                }}
              >
                Open
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
