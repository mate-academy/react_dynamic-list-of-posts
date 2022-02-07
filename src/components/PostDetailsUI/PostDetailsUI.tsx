import { Comments } from '../Comments';

type Props = {
  postComments: PostComment[];
  selectedPost: Post;
  isCommentsShow: boolean;
  onDeleteComment: (commentId: number) => Promise<void>
  onchangeShowComments: () => void;
  isComLoading: boolean;
};

export const PostDetailsUI: React.FC<Props> = ({
  postComments,
  selectedPost,
  isCommentsShow,
  onDeleteComment,
  onchangeShowComments,
  isComLoading,
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
        <Comments
          postComments={postComments}
          isCommentsShow={isCommentsShow}
          onDeleteComment={onDeleteComment}
          onchangeShowComments={onchangeShowComments}
          isComLoading={isComLoading}
        />
      )
      : (
        <section className="PostDetails__comments">
          No comments yet
        </section>
      )}
  </>
);
