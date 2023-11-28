import classNames from 'classnames';

import { Post } from '../types/Post';

type Props = {
  userPosts: Post[] | [];
  selectedPost: Post | null;
  setSelectedPost: (selectedPost: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  selectedPost,
  setSelectedPost,
}) => (
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
        {userPosts?.map(post => {
          const handleButtonClick = () => {
            if (selectedPost === null || selectedPost !== post) {
              setSelectedPost(post);
            } else {
              setSelectedPost(null);
            }
          };

          const postIsSelect = selectedPost === post;

          return (
            <tr data-cy="Post" key={post.id}>
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
                    { 'is-light': !postIsSelect },
                  )}
                  onClick={handleButtonClick}
                >
                  {postIsSelect ? (
                    'Close'
                  ) : (
                    'Open'
                  )}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
