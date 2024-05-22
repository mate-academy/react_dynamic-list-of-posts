import React, { useContext, useEffect } from 'react';
import { DispatchContext, StateContext } from '../context/GlobalPostsProvider';
import { client } from '../utils/fetchClient';
import { Post } from './Post';

export const PostsList: React.FC = () => {
  const { user, posts } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        try {
          // dispatch({ type: 'isPostsLoading', isPostsLoading: true });
          const fetchedPosts = await client.get<any[]>(`/posts?userId=${user.id}`);
          dispatch({ type: 'setPosts', posts: fetchedPosts });
        } catch (error) {
          dispatch({ type: 'setPostsFetchError', postsFetchError: true });
        } finally {
          dispatch({ type: 'isPostsLoading', isPostsLoading: false });
        }
      }
    };

    fetchPosts();
  }, [user]);

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>
      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts?.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
