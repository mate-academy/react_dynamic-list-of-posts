import classNames from 'classnames';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';

type Props = {
  postDetails: Post,
  isHidden: boolean,
  comments: PostComment[],
  initialize: boolean,
  selectedPostId: number,
  handleAdd: (comment: NewComment) => void,
  handleDelete: (commentId: number) => void,
  handleVisabiliti: () => void,
};

export const PostDetailsUi: React.FC<Props> = ({
  handleAdd,
  handleDelete,
  handleVisabiliti,
  selectedPostId,
  postDetails,
  initialize,
  isHidden,
  comments,
}) => (
  <div className="PostDetails">
    {selectedPostId !== 0
      ? (
        <>
          <h2>Post details:</h2>
          {initialize
            ? <Loader />
            : (
              <>
                <section className="PostDetails__post">
                  <p>{postDetails.title}</p>
                </section>
                <section className="PostDetails__comments">
                  <button
                    type="button"
                    className="button"
                    onClick={handleVisabiliti}
                  >
                    {isHidden
                      ? `Show ${comments.length} comments`
                      : `Hide ${comments.length} comments`}
                  </button>

                  <ul className="PostDetails__list">
                    {comments.map(comment => (
                      <li
                        key={comment.id}
                        className={classNames(
                          'PostDetails__list-item',
                          {
                            hide: isHidden,
                          },
                        )}
                      >
                        <button
                          type="button"
                          className="PostDetails__remove-button button"
                          onClick={() => handleDelete(comment.id)}
                        >
                          X
                        </button>
                        <p>{comment.body}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm handleAdd={handleAdd} selectedPostId={selectedPostId} />
            </div>
          </section>
        </>
      )
      : 'No post selected'}
  </div>
);
