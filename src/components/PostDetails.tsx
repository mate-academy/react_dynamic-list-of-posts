// import React, { useEffect, useState } from "react";
// import { Loader } from "./Loader";
// import { Post } from "../types/Post";
// import { Comment, CommentData } from "../types/Comment";
// import { NewCommentForm } from "./NewCommentForm";

// import { Notification } from "../enums/Notification";

// interface Props {
//   selectedPost: Post | null;
//   comments: Comment[];
//   notification: Notification;
//   loading: boolean;
//   onDeleteComment: (commentId: number) => Promise<void>;
//   onAddComment: (newComment: CommentData) => Promise<Comment>;
// }

// export const PostDetails: React.FC<Props> = ({
//   selectedPost,
//   comments,
//   notification,
//   loading,
//   onDeleteComment,
//   onAddComment,
// }) => {
//   const [editForm, setEditForm] = useState(false);

//   useEffect(() => {
//     setEditForm(false);
//   }, [selectedPost]);

//   const isShowWriteCommentButton =
//     notification !== Notification.LoadingError && !loading && !editForm;

//   const writeCommentButton = isShowWriteCommentButton && (
//     <button
//       data-cy="WriteCommentButton"
//       type="button"
//       className="button is-link"
//       onClick={() => setEditForm(true)}
//     >
//       Write a comment
//     </button>
//   );

//   const shouldShowNoCommentsMessage =
//     !loading &&
//     comments.length === 0 &&
//     notification === Notification.WarningComments;

//   return (
//     <div className="content" data-cy="PostDetails">
//       <div className="block">
//         <h2 data-cy="PostTitle">
//           {`#${selectedPost?.id}: ${selectedPost?.title}`}
//         </h2>

//         <p data-cy="PostBody">{selectedPost?.body}</p>
//       </div>

//       <div className="block">
//         {loading && <Loader />}

//         {!loading && notification === Notification.LoadingError && (
//           <div className="notification is-danger" data-cy="CommentsError">
//             {notification}
//           </div>
//         )}

//         {shouldShowNoCommentsMessage && (
//           <p className="title is-4" data-cy="NoCommentsMessage">
//             {notification}
//           </p>
//         )}

//         {!loading && comments.length > 0 && (
//           <>
//             <p className="title is-4">Comments:</p>

//             {comments.map((comment: Comment) => {
//               return (
//                 <article
//                   className="message is-small"
//                   data-cy="Comment"
//                   key={comment.id}
//                 >
//                   <div className="message-header">
//                     <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
//                       {comment.name}
//                     </a>
//                     <button
//                       data-cy="CommentDelete"
//                       type="button"
//                       className="delete is-small"
//                       aria-label="delete"
//                       onClick={() => onDeleteComment(comment.id)}
//                     ></button>
//                   </div>

//                   <div className="message-body" data-cy="CommentBody">
//                     {comment.body}
//                   </div>
//                 </article>
//               );
//             })}
//           </>
//         )}

//         {writeCommentButton}
//       </div>

//       {!loading && editForm && notification !== Notification.LoadingError && (
//         <NewCommentForm
//           onAddComment={(newComment) => onAddComment(newComment)}
//         />
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { Post } from "../types/Post";
import { Comment } from "../types/Comment";
import { NewCommentForm } from "./NewCommentForm";

import { Notification } from "../enums/Notification";

interface Props {
  selectedPost: Post | null;
  comments: Comment[];
  notification: Notification;
  loading: boolean;
  onDeleteComment: (commentId: number) => Promise<void>;
}

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  notification,
  loading,
  onDeleteComment,
}) => {
  const [editForm, setEditForm] = useState(false);

  useEffect(() => {
    setEditForm(false);
  }, [selectedPost]);

  const isShowWriteCommentButton =
    notification !== Notification.LoadingError && !loading && !editForm;

  const writeCommentButton = isShowWriteCommentButton && (
    <button
      data-cy="WriteCommentButton"
      type="button"
      className="button is-link"
      onClick={() => setEditForm(true)}
    >
      Write a comment
    </button>
  );

  const shouldShowNoCommentsMessage =
    !loading &&
    comments.length === 0 &&
    notification === Notification.WarningComments;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {!loading && notification === Notification.LoadingError && (
          <div className="notification is-danger" data-cy="CommentsError">
            {notification}
          </div>
        )}

        {shouldShowNoCommentsMessage && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            {notification}
          </p>
        )}

        {!loading && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map((comment: Comment) => {
              return (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => onDeleteComment(comment.id)}
                    ></button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              );
            })}
          </>
        )}

        {writeCommentButton}
      </div>

      {!loading && editForm && notification !== Notification.LoadingError && (
        <NewCommentForm />
      )}
    </div>
  );
};
