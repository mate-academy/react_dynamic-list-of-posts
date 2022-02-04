import React, { useEffect, useState } from 'react';
import { getPosts } from '../../api/posts';
import './PostsList.scss';

type Props = {
  selectedUserId: number,
  selectedPostId: number,
  setSelectePostId: (postId: number) => void
};

export const PostsList: React.FC<Props> = ({
  selectedUserId,
  selectedPostId,
  setSelectePostId,
}) => {
  const [posts, setPosts] = useState([] as Post[]);

  const loadData = async () => {
    setPosts(await getPosts(selectedUserId));
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                {`User #${post.userId}`}
                :
                {' '}
              </b>
              sunt aut facere repellat provident occaecati excepturi optio
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => setSelectePostId(post.id)}
            >
              {selectedPostId === post.id
                ? 'Close'
                : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
