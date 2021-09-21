import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment, addComment } from '../../api/comments';
import { Loader } from '../Loader';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = (props) => {
  const { selectedPostId } = props;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loader, setLoader] = useState(true);
  const [isHide, setIsHide] = useState(true);

  useEffect(() => {
    setLoader(true);

    (async () => {
      const postFromServer = await getPostDetails(selectedPostId);

      setPost(postFromServer);
      setLoader(false);
    })();

    (async () => {
      const commentFromServer = await getPostComments(selectedPostId);

      setComments(commentFromServer);
      setLoader(false);
    })();
  }, [selectedPostId]);

  const createComment = async (newComment: Partial<Comment>) => {
    await addComment(newComment);

    const newCommentsFromServer = await getPostComments(selectedPostId);

    setComments(newCommentsFromServer);
  };

  const removeComment = async (commentId: number) => {
    await deleteComment(commentId);

    const newCommentsFromServer = await getPostComments(selectedPostId);

    setComments(newCommentsFromServer);
  };

  const handleHide = () => {
    setIsHide(!isHide);
  };

  return (
    !loader ? (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          {post && post.title}
        </section>

        {comments.length > 0 && (
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={handleHide}
            >
              {isHide
                ? `Hide ${comments.length} comments`
                : `Show ${comments.length} comments`}
            </button>
            {isHide && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li
                    key={comment.id}
                    className="PostDetails__list-item"
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => {
                        removeComment(comment.id);
                      }}
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
              selectedPostId={selectedPostId}
              onAdd={createComment}
            />
          </div>
        </section>
      </div>
    ) : (
      <Loader />
    )
  );
};
