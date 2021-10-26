import React from 'react';
import './PostsList.scss';

interface Props {
  posts: Post[],
  onSelectedPostId: (postId: number) => void,
  selectedPostId: number,
}

export const PostsList: React.FC<Props> = ({
  posts,
  onSelectedPostId,
  selectedPostId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => {
        const { userId, title, id } = post;

        return (
          <li className="PostsList__item">
            <div>
              <b>
                [User&nbsp;
                {userId}
                ]:
              </b>
              {title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onSelectedPostId(id)}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        );
      })}
    </ul>
  </div>
);
