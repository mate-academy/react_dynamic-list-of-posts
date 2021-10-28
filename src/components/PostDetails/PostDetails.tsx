import React, { useEffect, useState } from 'react';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deletePostComment, addPostComment } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: string;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post>();
  const [postComments, setPostComments] = useState<PostComment[]>([]);
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId).then(response => setPost(response));

    if (selectedPostId !== '') {
      getPostComments(selectedPostId).then(response => setPostComments(response));
    }
  }, [selectedPostId]);

  if (!post || selectedPostId === '') {
    return <h1>No post selected</h1>;
  }

  const handleCommentDelete = (commentId: number) => {
    deletePostComment(commentId);
    setPostComments(current => current?.filter(({ id }) => commentId !== id));
  };

  const handleCommentAdd = async (comment: Partial<PostComment>) => {
    const newComment = await addPostComment(comment);

    setPostComments(current => [...current, newComment]);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setIsCommentVisible(!isCommentVisible);
          }}
        >
          {isCommentVisible
            ? 'Hide '
            : 'Show '}
          {`${postComments?.length} `}
          comments
        </button>

        {isCommentVisible
          && (
            <ul className="PostDetails__list">
              {postComments?.map(comment => (
                <li className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      handleCommentDelete(comment.id);
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

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            onCommentAdd={handleCommentAdd}
            postId={+selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};
