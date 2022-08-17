import { FC, useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Post } from '../../types/Post';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { apiHelper } from '../../api/apiHelper';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

interface Props {
  postId: number,
}

export const PostDetails: FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isHide, setIsHide] = useState(false);

  useEffect(() => {
    apiHelper(
      getPostDetails,
      postId,
      setIsLoading,
      setErrorMsg,
    ).then(setPost);
  }, [postId]);

  useEffect(() => {
    apiHelper(
      getPostComments,
      postId,
      setIsLoading,
      setErrorMsg,
    ).then(setComments);
  }, [postId]);

  return (
    <>
      {post && !errorMsg && (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post" data-cy="postDetails">
            <p>{post.title}</p>
          </section>

          {isLoading ? (
            <Loader />
          ) : (
            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={() => setIsHide(prevState => !prevState)}
              >
                {`${isHide ? 'Show' : 'Hide'} ${comments.length}`}
              </button>

              {!isHide && (
                <ul className="PostDetails__list" data-cy="postList">
                  {comments.map(comment => (
                    <li key={comment.id} className="PostDetails__list-item">
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
              <NewCommentForm />
            </div>
          </section>
        </div>
      )}
      {isLoading && <Loader />}
      {errorMsg && <div>{`Something went wrong... ${errorMsg}`}</div>}
    </>
  );
};
