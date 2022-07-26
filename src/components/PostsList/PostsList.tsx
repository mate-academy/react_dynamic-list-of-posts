import React from 'react';
import './PostsList.scss';
import { Post } from '../../types/Post';

type Props = {
  posts: Post[];
  postIdHandler: (post: number | null) => void;
  choosePost: number | null;
};

export const PostsList: React.FC<Props> = ({
  posts,
  postIdHandler,
  choosePost,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => {
          return (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>
              {choosePost === post.id ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => postIdHandler(null)}
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => postIdHandler(post.id)}
                >
                  Open
                </button>
              )}

            </li>
          );
        })}
      </ul>
    </div>
  );
};
