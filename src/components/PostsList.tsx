import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

interface Props {
  posts: Post[],
  hasSidebar: boolean,
  setSidebar: (state: boolean) => void,
  selectPost: number,
  setSelectPost: (postId: number) => void,
}

export const PostsList: React.FC<Props> = React.memo(({
  posts,
  hasSidebar,
  setSidebar,
  selectPost,
  setSelectPost,
}) => {
  const toogleSideBar = (id: number) => {
    if (id === selectPost) {
      setSelectPost(0);
      setSidebar(!hasSidebar);
    } else {
      setSidebar(true);
      setSelectPost(id);
    }
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>
      <table
        className="table is-fullwidth is-striped is-hoverable is-narrow"
      >
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button is-link',
                    { 'is-light': post.id !== selectPost || !hasSidebar },
                  )}
                  onClick={() => toogleSideBar(post.id)}
                >
                  {selectPost === post.id && hasSidebar ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
