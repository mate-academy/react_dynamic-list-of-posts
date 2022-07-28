import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import './PostsList.scss';

type Props = {
  selectedUser: number,
  posts: Post[],
  setVisiblePost: (postsFromServer: Post[]) => void,
  selectPost: (post: Post | null) => void,
  selectedPostId: number | undefined,
};

export const PostsList: React.FC<Props> = ({
  selectedUser,
  posts,
  setVisiblePost,
  selectPost,
  selectedPostId,
}) => {
  const [loadingError, setLoadingError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const postsFromServer = await getUserPosts(selectedUser);

        setVisiblePost(postsFromServer);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setLoadingError(true);
      }
    })();
  }, [selectedUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {loading ? <Loader /> : (
        <>
          {posts.length > 0 ? posts.map(post => (
            <ul
              className="PostsList__list"
              key={post.id}
              data-cy="postDetails"
            >
              <li className="PostsList__item">
                <div>
                  <b>{`[User #${post.id}]: `}</b>
                  {post.title}
                </div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    if (!selectedPostId) {
                      selectPost(post);
                    } else if (selectedPostId !== post.id) {
                      selectPost(post);
                    } else {
                      selectPost(null);
                    }
                  }}
                >
                  {selectedPostId === post.id ? 'Close' : 'Open'}
                </button>
              </li>
            </ul>
          )) : (
            <div className="block">
              <p className="subtitle">
                No users yet
              </p>
            </div>
          )}
        </>
      )}

      {loadingError && (
        <div className="columns is-centered">
          <div className="column">
            <p className="subtitle">
              Sorry, we can`t load data from this api
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
