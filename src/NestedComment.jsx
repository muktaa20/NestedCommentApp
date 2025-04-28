import React, { useState } from 'react';

const NestedComment = ({ comment, addReply, deleteComment }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => setIsReplying(true);
  const handleCancel = () => {
    setIsReplying(false);
    setReplyText('');
  };

  const handleSend = () => {
    if (replyText.trim()) {
      addReply(comment.id, replyText.trim());
      setIsReplying(false);
      setReplyText('');
    }
  };

  return (
    <div className="commentarea">
      <p className="commenttext">{comment.message}</p>

      {isReplying ? (
        <div className="reply">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <div className="actionbar">
            <button className="sendreply" onClick={handleSend}>Send</button>
            <button className="cancelreply" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="btncontainer">
          <button onClick={handleReply}>Reply</button>
          <button onClick={() => deleteComment(comment.id)}>Delete</button>
        </div>
      )}

      {comment.children?.length > 0 && (
        <div className="comment">
          {comment.children.map((child) => (
            <NestedComment
              key={child.id}
              comment={child}
              addReply={addReply}
              deleteComment={deleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NestedComment;
