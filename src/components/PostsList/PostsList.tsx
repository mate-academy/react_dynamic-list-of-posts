import React from 'react';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import './PostsList.scss';

interface Props {
  posts: Post[] | null
  selectedPostId: number
  onSelectPost: React.Dispatch<React.SetStateAction<number>>
  onSetDetailVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

export const PostsList = React.memo<Props>(({
  posts,
  selectedPostId,
  onSelectPost,
}) => {
  if (!posts) {
    return <Loader />;
  }

  if (posts.length === 0) {
    // eslint-disable-next-line max-len
    return <h1 style={{ textAlign: 'center' }}>The user has no posts yet</h1>;
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => {
          const handlePostSelector = () => {
            if (selectedPostId === post.id) {
              onSelectPost(0);
            } else {
              onSelectPost(post.id);
            }
          };

          return (
            <li key={post.id} className="PostsList__item">
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={handlePostSelector}
              >
                {selectedPostId === post.id ? 'Close' : 'Open'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
});
