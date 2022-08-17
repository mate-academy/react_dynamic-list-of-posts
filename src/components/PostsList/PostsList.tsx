import { FC } from 'react';
import './PostsList.scss';
import { Post } from '../../types/Post';

interface Props {
  posts: Post[];
  selectedPostId: number;
  onSelectedPostId: (postId: number) => void;
}

export const PostsList: FC<Props> = ({
  posts,
  selectedPostId,
  onSelectedPostId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list" data-cy="postList">
      {posts.map(post => (
        <li className="PostsList__item" key={post.id}>
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>
          {selectedPostId === post.id ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onSelectedPostId(0)}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onSelectedPostId(post.id)}
            >
              Open
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);
