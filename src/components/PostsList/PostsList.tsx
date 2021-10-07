import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import { getPosts, getUserPosts } from '../../api/api';

type Props = {
  userId: number,
  setSelectedPostId: (postId: number) => void;
  selectedPostId: number,
};

export const PostsList: React.FC<Props> = (props) => {
  const { userId, setSelectedPostId, selectedPostId } = props;
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const getPostFromApi = await getPosts();

      setPosts(getPostFromApi);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const getUserPostFromApi = userId ? (await getUserPosts(userId))
        : (await getPosts());

      setPosts(getUserPostFromApi);
    })();
  }, [userId]);

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
                {' '}
              </b>
              {post.title}
            </div>
            {(selectedPostId === post.id) ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => setSelectedPostId(0)}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => setSelectedPostId(post.id)}
              >
                Open
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
