import { FC, useContext } from 'react';
import { PostsContext } from './PostsContext';

export const PostsList: FC = () => {
  const { post, setPost, posts } = useContext(PostsContext);

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
          {posts.map(eachPost => {
            const selected = eachPost.id === post?.id;

            return (
              <tr key={eachPost.id} data-cy="Post">
                <td data-cy="PostId">{eachPost.id}</td>

                <td data-cy="PostTitle">
                  {eachPost.title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={`button is-link${selected ? ' is-light' : ''}`}
                    onClick={() => setPost(selected ? null : eachPost)}
                  >
                    {selected ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
