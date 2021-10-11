import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[];
  openPost: (id: number) => void;
  selectedPostId: number;
};

export const PostsList: React.FC<Props> = (props) => {
  const { posts, openPost, selectedPostId } = props;

  const changeSelectedPostId = (postId: number) => {
    const id = postId === selectedPostId ? 0 : postId;

    openPost(id);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                {`[User # ${post.userId}]:`}
              </b>
              {post.body}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => changeSelectedPostId(post.id)}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
