import React, { useState, useEffect } from 'react';
import { addComments, deletePostComment, getComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import '@fortawesome/fontawesome-free/css/all.css';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post>({} as Post);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isHidden, setIsHidden] = useState(false);
  const [hasLoad, setHasLoad] = useState(true);

  useEffect(() => {
    (async () => {
      setHasLoad(true);
      const [newPost, newComments] = await Promise.all([
        getPostDetails(postId),
        getComments(postId),
      ]);

      setPost(newPost);
      setComments(newComments);

      setHasLoad(false);
    })();
  }, [postId]);

  const onCommentDelete = (commentId: number) => {
    deletePostComment(commentId);

    setComments(current => current.filter(({ id }) => commentId !== id));
  };

  const onCommentAdd = async (comment: Partial<PostComment>) => {
    const newComment = await addComments(comment);

    setComments(current => [...current, newComment]);
  };

  if (hasLoad) {
    return (
      <Loader />
    );
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length ? (
          <>
            <button
              type="button"
              className="button is-info my-3"
              onClick={() => setIsHidden(current => !current)}
            >
              {`${isHidden ? 'Show comments' : 'Hide comments'}`}
            </button>

            <ul className="PostDetails__list">
              {!isHidden && comments.map(comment => (
                <li key={comment.id} className="PostDetails__list-item">
                  <button
                    onClick={() => onCommentDelete(comment.id)}
                    type="button"
                    className="PostDetails__remove-button button is-danger px-5"
                  >
                    X
                  </button>
                  <div
                    className="box"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <i className="fas fa-2x fa-user pr-5" />
                    <div>
                      {'User: '}
                      {comment.name}
                      <p>
                        {comment.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p
            className="notification is-info my-5"
            style={{ textAlign: 'center' }}
          >
            There is no comments!
          </p>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            onCommentAdd={onCommentAdd}
            postId={postId}
          />
        </div>
      </section>
    </div>
  );
};
