type Props = {
  postComments: PostComment[];
  selectedPost: Post;
  isCommentsShow: boolean;
  onDeleteComment: (commentId: number) => Promise<void>
  onchangeShowComments: () => void;
};

export const PostDetailsUI: React.FC<Props> = ({
  postComments,
  selectedPost,
  isCommentsShow,
  onDeleteComment,
  onchangeShowComments,
}) => (
  <>
    <section className="PostDetails__post">
      <b>
        <span>
          [User #
          {selectedPost.userId}
          ]:
        </span>
      </b>
      {' '}
      <span>{selectedPost.title}</span>
    </section>

    <section className="PostDetails__post">
      <p>{selectedPost.body}</p>
    </section>

    {postComments.length > 0
      ? (
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
      )
      : (
        <section className="PostDetails__comments">
          No comments yet
        </section>
      )}
  </>
);
