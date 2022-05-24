/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { getUserPostsById, getUsersPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import './PostsList.scss';

type Props = {
  setSelectedPostId: (React.Dispatch<React.SetStateAction<number>>),
  selectedPostId: number,
};

export const PostsList: React.FC<Props> = React.memo(({
  setSelectedPostId,
  selectedPostId,
}) => {
  const [posts, setPosts] = useState<Array<Post> | null>(null);
  const [isPostListLoading, setIsPostListLoading] = useState(false);
  const [filterByUserId, setFilterByUserId] = useState(0);

  const getUserPosts = useCallback(async () => {
    try {
      setIsPostListLoading(true);
      setPosts(null);
      setSelectedPostId(0);

      let neededPosts;

      if (filterByUserId === 0) {
        neededPosts = await getUsersPosts();
      } else {
        neededPosts = await getUserPostsById(filterByUserId);
      }

      setPosts(neededPosts);
    } catch (e) {
      console.log(`can't load data from serever: ${e}`);
    }

    setIsPostListLoading(false);
  }, [filterByUserId]);

  useEffect(() => {
    getUserPosts();
  }, [filterByUserId]);

  return (
    <>
      <header className="PostsList__filter-props-block">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={filterByUserId}
            onChange={({ target }) => {
              setFilterByUserId(+target.value);
            }}
          >
            <option value="0">All users</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option>
          </select>
        </label>
      </header>

      {!posts ? (
        <h2>
          No one posts is avalible
        </h2>
      )
        : (
          <div className="PostsList">
            <h2>Posts:</h2>

            <ul className="PostsList__list">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="PostsList__item"
                >
                  <div>
                    <b>
                      [User #
                      {post.userId}
                      ]:
                    </b>
                    {post.title}
                  </div>
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => {
                      if (selectedPostId === post.id) {
                        setSelectedPostId(0);

                        return;
                      }

                      setSelectedPostId(post.id);
                    }}
                  >
                    {selectedPostId === post.id
                      ? 'Close'
                      : 'Open'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      {isPostListLoading && (
        <Loader />
      )}
    </>
  );
});
