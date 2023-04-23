import { FC } from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[],
  selectedPostId: number | null,
  onSelectPost: (post: Post | null) => void,
};

export const PostsList: FC<Props> = ({
  posts,
  selectedPostId,
  onSelectPost,
}) => {
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
            <PostItem
              key={post.id}
              post={post}
              isSelected={post.id === selectedPostId}
              onSelectPost={onSelectPost}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
