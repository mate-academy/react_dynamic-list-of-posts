import * as React from 'react';
import { Post } from '../../react-app-env';
import './PostsList.scss';

type Props = {
  posts: Post[];
  setNewId: (newId: number) => void;
};

export const PostsList: React.FC<Props> = (props) => {
  const { posts, setNewId } = props;

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                [User #
                {post.userId}
                ]:
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                setNewId(post.id);
              }}
            >
              Open
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
