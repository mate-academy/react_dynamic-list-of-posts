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
          dispatch({ type: 'isPostsLoading', isPostsLoading: true }); // isPostsLoading треба
          const fetchedPosts = await client.get<any[]>(`/posts?userId=${user.id}`);
          dispatch({ type: 'setPosts', posts: fetchedPosts, isPostsLoading: false });
        } catch (error) {
          dispatch({ type: 'setPostsFetchError', postsFetchError: true });
        } finally {
          dispatch({ type: 'isPostsLoading', isPostsLoading: false }); // isPostsLoading треба
        }
      }
    };

    fetchPosts();
  }, [user, dispatch]);

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts?.map(post => {
            return (
              <Post
                key={post.id}
                post={post}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

