import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[];
  selectPost: (postId: number) => void;
  selectedPostId: number;
};

export const PostsList: React.FC<Props> = (props) => {
  const {
    posts,
    selectPost,
    selectedPostId,
  } = props;

  const handleClickPost = (postId: number) => {
    if (selectedPostId === postId) {
      selectPost(0);
    } else {
      selectPost(postId);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {
          posts.map(post => (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleClickPost(post.id)}
              >
                { selectedPostId === post.id
                  ? 'Close'
                  : 'Open' }
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};
