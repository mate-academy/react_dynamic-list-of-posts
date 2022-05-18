import React from 'react';
import { Loader } from '../Loader';
import './PostsList.scss';

type Props = {
  posts: Posts[],
  postId: number,
  selectPostId: (postId: number) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  postId,
  selectPostId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    {posts.length === 0
      ? <Loader />
      : (
        <ul className="PostsList__list">
          {posts.map(post => (
            <li
              key={post.id}
              className="PostsList__item"
            >
              <div>
                <b>
                  {`[User #${post.userId}]: `}
                </b>
                <b>{post.title}</b>
                <p>{post.body}</p>
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => selectPostId(post.id)}
              >
                {postId === post.id ? 'Close' : 'Open'}
              </button>
            </li>
          ))}
        </ul>
      )}
  </div>
);
