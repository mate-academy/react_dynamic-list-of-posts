import React from 'react';
import { Post } from '../../types/posts';
import './PostsList.scss';

interface Props {
  posts: Post[];
  selectedPost: number,
  selectPost: (postId: number) => void,
}

export const PostsList: React.FC<Props> = ({
  posts, selectedPost, selectPost,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map((post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                {`[User #${post.userId}] `}
              </b>
              {post.title}
            </div>
            {selectedPost !== post.id
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => selectPost(post.id)}
                >
                  Open
                </button>
              ) : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => selectPost(0)}
                >
                  Close
                </button>
              )}
          </li>
        )))}
      </ul>
    </div>
  );
};
