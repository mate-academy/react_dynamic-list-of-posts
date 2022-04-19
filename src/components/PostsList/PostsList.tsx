import React, { Dispatch, SetStateAction, useEffect } from 'react';
import './PostsList.scss';
import { getUserPosts, fetchAllPosts } from '../../api/posts';

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
    const result = await fetchAllPosts();

    onPostsSet(result);
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

            {selectedPostId !== post.id ? (
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
