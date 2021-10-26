import React, { useState, useEffect } from 'react';
import { getPosts } from '../../api/api';
import './PostsList.scss';

type Props = {
  userId: string,
  getPostId: (value: number | null) => void,
};

export const PostsList: React.FC<Props> = ({
  userId,
  getPostId,
}) => {
  const [posts, addPosts] = useState<Post[]>([]);
  const [isPostSelected, setIsPostSelected] = useState(false);
  const [postId, addPostId] = useState<number | null>(null);

  useEffect(() => {
    getPosts().then(promise => {
      addPosts(promise);
    });
    addPostId(null);
  }, [userId]);

  const checkPostSelected = (id: number) => {
    if (id === postId) {
      addPostId(null);
      setIsPostSelected(false);
    } else {
      addPostId(id);
    }
  };

  getPostId(postId);

  const postsToDisplay
    = (userId !== '0')
      ? posts.filter(post => post.userId === +userId)
      : posts;

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {isPostSelected}
      <ul className="PostsList__list">
        {postsToDisplay.map(post => (
          <>
            <li
              onSubmit={() => setIsPostSelected(true)}
              className="PostsList__item"
              key={post.id}
            >
              <div>
                <b>{`[ User #: ${post.userId} ] `}</b>
                {post.body}
              </div>
              <button
                onClick={() => checkPostSelected(post.id)}
                type="submit"
                className="PostsList__button button"
              >
                {postId === post.id ? 'Close' : 'Open'}
              </button>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};
