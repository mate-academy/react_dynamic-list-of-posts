import { FC } from 'react';
import { Post } from '../types/Post';

type Props = {
  userPosts: Post[];
  onPostSelect: (post: Post | null) => void;
  selectedPostID: number | undefined;
};

export const PostsList: FC<Props> = ({
  userPosts,
  onPostSelect,
  selectedPostID,
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
          {userPosts.map(post => {
            const {
              id,
              title,
            } = post;

            const isOpen = selectedPostID === id;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  {!isOpen && (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
                      onClick={() => onPostSelect(post)}
                    >
                      Open
                    </button>
                  )}

                  {isOpen && (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link"
                      onClick={() => onPostSelect(null)}
                    >
                      Close
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
