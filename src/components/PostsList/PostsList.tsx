import React from 'react';
import './PostsList.scss';

interface Props {
  postsList: Post[];
  setSelectedPostId: (id: number) => void;
  setSelectedPost: (post: null) => void;
  selectedPost: Post | null;
}

export const PostsList: React.FC<Props> = (props) => {
  const {
    postsList,
    setSelectedPostId,
    setSelectedPost,
    selectedPost,
  } = props;

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {postsList.length > 0 && postsList.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => (
                !selectedPost ? setSelectedPostId(post.id) : setSelectedPost(null)
              )}
            >
              {selectedPost?.id === post.id ? <div>Close</div> : <div>Open</div>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
