import React, { Dispatch, SetStateAction, useEffect } from 'react';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';
import { BASE_URL } from '../../api/api';

type Props = {
  posts: Post[],
  userId: number,
  onPostsSet: Dispatch<SetStateAction<Post[]>>,
  onPostId: Dispatch<SetStateAction<number>>,
  selectedPostId: number,
};

export const PostsList: React.FC<Props> = ({
  posts,
  userId,
  onPostsSet,
  onPostId,
  selectedPostId,
}) => {
  const fetchPosts = async () => {
    const response = await fetch(`${BASE_URL}/posts`);

    if (!response.ok) {
      throw new Error(`Status: ${response.status}
        - StatusText: ${response.statusText}`);
    }

    const data = await response.json();

    onPostsSet(data);
  };

  useEffect(() => {
    if (userId === 0) {
      fetchPosts();
    }
  }, [userId]);

  const fetchIndividualPosts = async () => {
    const result = await getUserPosts(userId);

    if (userId) {
      onPostsSet(result);
    }
  };

  useEffect(() => {
    fetchIndividualPosts();
  }, [userId]);

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
                [User #
                {post.userId}
                ]:
                {' '}
                {post.title}
              </b>
              {' - '}
              {post.body}
            </div>

            {!selectedPostId ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  onPostId(post.id);
                }}
              >
                Open
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  onPostId(0);
                }}
              >
                Close
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
