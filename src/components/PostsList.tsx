import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  setPost: (post: Post) => void;
  openPostDetails: number;
  setOpenPostDetails: (openPostDetails: number) => void;
  getCommentsPost: (post: Post) => void;
  setWriteComment: (writeComment: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setPost,
  openPostDetails,
  setOpenPostDetails,
  getCommentsPost,
  setWriteComment,
}) => (
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
        {posts.map(post => {
          const { id, title } = post;

          return (
            <tr data-cy="Post" key={id}>
              <td data-cy="PostId">{id}</td>

              <td data-cy="PostTitle">{title}</td>

              <td className="has-text-right is-vcentered">
                {openPostDetails === id ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => {
                      setOpenPostDetails(0);
                      setWriteComment(false);
                    }}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => {
                      setOpenPostDetails(id);
                      getCommentsPost(post);
                      setPost(post);
                      setWriteComment(false);
                    }}
                  >
                    Open
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
