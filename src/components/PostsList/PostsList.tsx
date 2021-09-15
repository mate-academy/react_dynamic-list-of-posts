import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';

type Props = {
  selectedUserId: number;
  setPost: React.Dispatch<React.SetStateAction<number>>;
  selectedPostId: number;
};

export const PostsList: React.FC<Props> = (props) => {
  const { selectedUserId, setPost, selectedPostId } = props;
  const [posts, setPosts] = useState([] as Post[]);
  const [loading, setLoadingStatus] = useState(true);

  useEffect(() => {
    getUserPosts(selectedUserId)
      .then(response => {
        setPosts(response);
        setLoadingStatus(false);
      });
  }, [selectedUserId]);

  const selectHandler = (id: number) => {
    if (id === selectedPostId) {
      setPost(0);
    } else {
      setPost(id);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {loading && (
        <Loader />
      )}
      <ul className="PostsList__list">
        {posts.map((post: Post) => (
          <>
            <li
              className="PostsList__item"
              key={post.id}
            >
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => selectHandler(post.id)}
              >
                {selectedPostId === post.id ? (
                  'Close'
                ) : (
                  'Open'
                )}
              </button>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};
