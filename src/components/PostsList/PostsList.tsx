import React from 'react';
import './PostsList.scss';
import { Post } from '../../react-app-env';

interface Props {
  posts: Post[],
  selectedPostId: number,
  setSelectedPostId: (postID: number) => void,
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  setSelectedPostId,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]`}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => (
                selectedPostId === post.id
                  ? setSelectedPostId(0)
                  : setSelectedPostId(post.id)
              )}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
