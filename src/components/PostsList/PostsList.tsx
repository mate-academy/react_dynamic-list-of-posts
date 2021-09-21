import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import { getAllPosts, getUserPosts } from '../../api/posts';
import { Loader } from '../Loader/Loader';

type Props = {
  selectedUserId: number;
  selectedPostId: number;
  selectedPost: (id: number) => void;
};

export const PostsList: React.FC<Props> = (props) => {
  const { selectedUserId, selectedPostId, selectedPost } = props;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);

    if (selectedUserId === 0) {
      (async () => {
        const postsFromServer = await getAllPosts();

        setPosts(postsFromServer);
        setLoader(false);
      })();
    } else {
      (async () => {
        const postsFromServer = await getUserPosts(selectedUserId);

        setPosts(postsFromServer);
        setLoader(false);
      })();
    }
  }, [selectedUserId]);

  if (loader) {
    return <Loader />;
  }

  const handleClick = (id: number) => {
    if (id !== selectedPostId) {
      selectedPost(id);
    } else {
      selectedPost(0);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>
                {`User #${post.userId}`}
              </b>
              {post.title}
            </div>

            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleClick(post.id)}
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
