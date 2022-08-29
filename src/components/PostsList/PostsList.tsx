import React, { useEffect } from 'react';
import { getAllPosts } from '../../api/posts';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Post } from '../../store/slices/postSlice/postSlice';
import { PostButton } from './PostButton';
import './PostsList.scss';

export const PostsList: React.FC = () => {
  const { posts } = useAppSelector(state => state.postSlice);
  const { selectedUser } = useAppSelector(state => state.userSlice)
  const { setPosts } = useActions();

  useEffect(() => {
    (async function() {
      const userPosts =  await getAllPosts();

      setPosts(userPosts.filter((post: Post) => selectedUser
      ? post.userId === selectedUser.id
      : 1));
    })()
  }, [selectedUser]);

  return posts.length > 0 ? (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => {

          return (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>[User {post.userId}]: </b>
                {post.title}
              </div>
              <PostButton post={post} />
            </li>
          )})}
      </ul>
    </div>
  ) : (
    <span>no posts</span>
  );
}
