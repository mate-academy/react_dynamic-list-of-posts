import React, { useState, useEffect } from 'react';
import './PostsList.scss';

import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader/Loader';

interface Post {
  id: number,
  userId: number,
  title: string;
  body: string;
}

type Props = {
  selectedUserId: string,
};

export const PostsList: React.FC<Props> = ({ selectedUserId }) => {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [isPostsLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (endpoint: string) => {
      const response = await getUserPosts(endpoint);

      setLoading(false);
      setPosts(response);
    };

    if (selectedUserId === '0') {
      setLoading(true);
      fetchData('');
    } else {
      setLoading(true);
      fetchData(`?userId=${selectedUserId}`);
    }
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {isPostsLoading ? (
          <Loader />
        ) : (
          posts.map(post => (
            <li key={post.id} className="PostsList__item">
              <div>
                <b>
                  {`[User #${post.userId}]: `}
                </b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
              >
                Close
              </button>
            </li>
          )))}
      </ul>
    </div>
  );
};
