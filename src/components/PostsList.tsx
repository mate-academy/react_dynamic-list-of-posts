import React, { useState } from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[] | null;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setHasErrorGetComments: (flag: boolean) => void;
  setIsLoadingComments: (flag: boolean) => void;
  setPost: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setComments,
  setHasErrorGetComments,
  setIsLoadingComments,
  setPost,
}) => {
  const [openPostId, setOpenPostId] = useState<number | null>(null);

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
          {posts &&
            posts.map(post => (
              <PostItem
                key={post.id}
                openPostId={openPostId}
                post={post}
                setComments={setComments}
                setHasErrorGetComments={setHasErrorGetComments}
                setIsLoadingComments={setIsLoadingComments}
                setPost={setPost}
                setOpenPostId={setOpenPostId}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};
