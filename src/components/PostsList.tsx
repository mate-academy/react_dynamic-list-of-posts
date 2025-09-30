import { Post } from '../types/Post';
import classNames from 'classnames';
import PropTypes from 'prop-types';

type Props = {
  posts: Post[];
  openedPost: Post | null;
  setOpenedPost: (value: Post | null) => void;
  setOpenForm: (value: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  openedPost,
  setOpenedPost,
  setOpenForm,
}) => {
  const handlePostBtnClick = (post: Post) => {
    setOpenForm(false);
    if (openedPost && openedPost.id === post.id) {
      setOpenedPost(null);
    } else {
      setOpenedPost(post);
    }
  };

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
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': !openedPost || post.id !== openedPost.id,
                  })}
                  onClick={() => handlePostBtnClick(post)}
                >
                  {openedPost && post.id === openedPost.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const postShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
});

PostsList.propTypes = {
  posts: PropTypes.arrayOf(postShape).isRequired as React.Validator<Post[]>,
  openedPost: postShape as React.Validator<Post | null>,
  setOpenedPost: PropTypes.func.isRequired,
  setOpenForm: PropTypes.func.isRequired,
};
