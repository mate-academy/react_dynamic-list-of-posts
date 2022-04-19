import React from 'react';
import './PostsList.scss';
import { Post } from '../../types/Posts';

type Props = {
  posts: Post[];
  selectedPostsId: number;
  setSelectedPostsId: (postId: number) => void;
};

// eslint-disable-next-line max-len
export const PostsList: React.FC<Props> = ({ posts, selectedPostsId, setSelectedPostsId }) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <>
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>
              {selectedPostsId === post.id
                ? (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => setSelectedPostsId(0)}
                  >
                    Close
                  </button>
                )
                : (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => setSelectedPostsId(post.id)}
                  >
                    Open
                  </button>
                )}
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};
