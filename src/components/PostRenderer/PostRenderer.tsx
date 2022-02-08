import React from 'react';

interface Props {
  post: Post,
  isSelected: boolean,
  setSelectedPostId: React.Dispatch<React.SetStateAction<number>>,
}

export const PostRenderer: React.FC<Props> = ({ post, isSelected, setSelectedPostId }) => {
  return (
    <>
      <div>
        <b>{`[User #${post.userId}]: `}</b>
        {post.title}
      </div>

      {!isSelected ? (
        <button
          type="button"
          className="PostsList__button button"
          onClick={() => setSelectedPostId(post.id)}
        >
          Open
        </button>
      ) : (
        <button
          type="button"
          className="PostsList__button button"
          onClick={() => setSelectedPostId(0)}
        >
          Close
        </button>
      )}
    </>
  );
};
