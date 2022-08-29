import React, { useEffect } from 'react';
import { getAllPosts } from '../../api/posts';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import './PostsList.scss';

export const PostsList: React.FC = () => {
  const { posts } = useAppSelector(state => state.postSlice);
  const { setPosts } = useActions();

  useEffect(() => {
    (async function() {
      const userPosts =  await getAllPosts();

      setPosts(userPosts);
    })()
  }, [posts.length]);

  return posts.length > 0 ? (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => {
          // console.log(post);

          return (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>[User {post.userId}]: </b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
              >
                Close
              </button>
            </li>
          )})}
      </ul>
    </div>
  ) : (
    <span>loading</span>
  );
}
