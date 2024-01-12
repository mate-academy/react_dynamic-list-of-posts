import React, { useState } from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[],
  handleComments: (value: number) => void,
  setChoosePost: (value: boolean) => void,
  setIsNewComment: (value: boolean) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  handleComments,
  setChoosePost,
  setIsNewComment,
}) => {
  const [idButton, setIdButton] = useState<number | undefined>();
  const postButton = (id: number) => {
    if (idButton === id) {
      setChoosePost(false);
      setIdButton(undefined);

      return;
    }

    setIsNewComment(false);
    handleComments(id);
    setIdButton(id);
  };

  return (
    <div data-cy="PostsList">
      <p className="title ">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow ">
        <thead>
          <tr className="has-background-link-light ">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>
        {posts?.map(post => (
          <PostItem
            key={post.id}
            post={post}
            postButton={postButton}
            idButton={idButton}
          />
        ))}
      </table>
    </div>
  );
};
