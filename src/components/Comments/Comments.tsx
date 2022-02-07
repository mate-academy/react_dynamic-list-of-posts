import { Loader } from '../Loader';

type Props = {
  postComments: PostComment[];
  isCommentsShow: boolean;
  onDeleteComment: (commentId: number) => Promise<void>
  onchangeShowComments: () => void;
  isComLoading: boolean;
};

export const Comments: React.FC<Props> = ({
  postComments,
  isCommentsShow,
  onDeleteComment,
  onchangeShowComments,
  isComLoading,
}) => {
  if (!isComLoading) {
    return (
      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={onchangeShowComments}
        >
          {isCommentsShow ? 'Hide' : 'Show'}
          {' '}
          {postComments.length}
          {' '}
          {postComments.length === 1 ? 'comment' : 'comments'}
        </button>
        {isCommentsShow
          && (
            <ul className="PostDetails__list">
              {postComments.map(postComment => (
                <li key={postComment.id} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      onDeleteComment(postComment.id);
                    }}
                  >
                    X
                  </button>
                  <p>{postComment.body}</p>
                </li>
              ))}
            </ul>
          )}
      </section>
    );
  }

  return (
    <Loader />
  );
};
