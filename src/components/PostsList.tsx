import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import NotificationStatus from 'types/NotificationStatus';
import PostsAsync from 'store/posts/postsAsync';
import { selectPosts } from 'store/posts/postsSelectors';
import { postsActions } from 'store/posts/postsSlice';
import { UiActions } from 'store/ui/uiSlice';
import PostItem from './PostItem';
import Loader from './Loader';

type Props = {
  authorId: number;
};

export const PostsList: React.FC<Props> = ({ authorId }) => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectPosts);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    dispatch(PostsAsync.fetchPosts(authorId))
      .unwrap()
      .catch((e) => {
        dispatch(UiActions.enqueueSnackbar({
          message: e.message,
          options: { variant: NotificationStatus.Error },
        }));
      })
      .finally(() => setLoading(false));

    return () => {
      dispatch(postsActions.setInitialField('posts'));
    };
  }, [authorId]);

  if (loading) {
    return <Loader />;
  }

  if (!posts) {
    return null;
  }

  if (!posts.length) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
