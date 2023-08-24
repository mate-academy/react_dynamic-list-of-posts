import React, { useState } from 'react';
import { Post } from '../../types/Post';
import { PostItem } from '../PostItem';

type Props = {
  posts: Post[];
  onSelectPost: (selectedPost: Post) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  onSelectPost,
}) => {
  const [openedPostId, setOpenedPostId] = useState<number>(0);

  const handlerOpenComments = (selectedPost: Post) => {
    setOpenedPostId(currentOpened => {
      return currentOpened === selectedPost.id ? 0 : selectedPost.id;
    });
    onSelectPost(selectedPost);
  };

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
              handlerOpenComments={handlerOpenComments}
              openedPostId={openedPostId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
