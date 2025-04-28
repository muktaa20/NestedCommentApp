// import React, { useState } from 'react';
import React, { useState } from "react";




const NestedComment = ({ comment, addReply, deleteReply }) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleAddReply = () => {
    if (replyText.trim() === "") return;
    addReply(comment.id, replyText);
    setReplyText("");
    setShowReplyInput(false);
  };

  return (
    <div className="commentarea" style={{ marginLeft: "20px", marginTop: "10px" }}>
      <p>{comment.message}</p>
      <button onClick={() => setShowReplyInput(!showReplyInput)}>
        {showReplyInput ? "Cancel" : "Reply"}
      </button>
      <button onClick={() => deleteReply(comment.id)}>Delete</button>

      {showReplyInput && (
        <div style={{ marginTop: "5px" }}>
          <input
            type="text"
            value={replyText}
            placeholder="Type your reply"
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={handleAddReply}>Submit Reply</button>
        </div>
      )}

      {/* Recursively render children */}
      {comment.children.length > 0 && (
        <div className="nested-replies">
          {comment.children.map((child) => (
            <NestedComment
              key={child.id}
              comment={child}
              addReply={addReply}
              deleteReply={deleteReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NestedComment;
