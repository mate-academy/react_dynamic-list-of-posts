import { FC, useEffect, useState } from 'react';
import { getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Comment } from '../../types/comment';
import { Post } from '../../types/post';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  postId: number
}

export const PostDetails: FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasCommentsHidden, setHasCommentsHidden] = useState(false);

  const loadComments = () => {
    getPostComments(postId)
      .then(commentsFromServer => setComments(commentsFromServer));
  };

  // const loadComments = useCallback(() => {
  //   getPostComments(postId)
  //     .then(commentsFromServer => setComments(commentsFromServer));
  // }, [postId]);

  useEffect(() => {
    if (postId !== 0) {
      getPostDetails(postId)
        .then(postFromServer => setPost(postFromServer));
      loadComments();
    } else {
      setPost(null);
      setComments([]);
    }
  }, [postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {post && (
        <>
          <section className="PostDetails__post">
            <p>{post.body}</p>
          </section>

          {comments.length > 0 && (
            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={() => setHasCommentsHidden(has => !has)}
              >
                {`${hasCommentsHidden ? 'show' : 'hide'} ${comments.length} comments`}
              </button>

              {!hasCommentsHidden && (
                <ul className="PostDetails__list">
                  {comments.map(comment => (
                    <li className="PostDetails__list-item" key={comment.id}>
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                      >
                        X
                      </button>
                      <p>{comment.body}</p>
                    </li>
                  ))}
                </ul>
              )}

            </section>
          )}

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                postId={post.id}
                reload={loadComments}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
