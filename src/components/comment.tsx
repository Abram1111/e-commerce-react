import React, { useEffect, useState } from "react";

interface CommentProps {
  productId: number;
}

/**
 * Comment Component
 *
 * Manages user comments for a specific product, identified by `productId`.
 * Comments are persisted in localStorage using a key specific to the product.
 *
 * State:
 * - comments: array of comment strings loaded from and saved to localStorage
 * - input: current text input for a new comment
 *
 * Effects:
 * - Loads comments from localStorage on component mount or when productId changes
 *
 * Handlers:
 * - addComment: adds a new comment if the input is not empty, updates localStorage
 * - removeComment: removes a comment by index, updates localStorage
 *
 * Render:
 * - Lists existing comments with a remove button for each
 * - Input box to type new comments
 * - Button to add the typed comment
 *
 * @component
 * @param {number} productId - ID of the product to associate comments with
 * @returns JSX.Element
 */
const Comment: React.FC<CommentProps> = ({ productId }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(`comments-${productId}`);
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, [productId]);

  const addComment = () => {
    if (!input.trim()) return;
    const newComments = [...comments, input];
    setComments(newComments);
    localStorage.setItem(`comments-${productId}`, JSON.stringify(newComments));
    setInput("");
  };

  const removeComment = (index: number) => {
    const updated = comments.filter((_, i) => i !== index);
    setComments(updated);
    localStorage.setItem(`comments-${productId}`, JSON.stringify(updated));
  };

  return (
    <div className="w-75 mx-auto mt-5 d-flex flex-column align-items-center">
      <h3 className="decorated-font">Add a Comment</h3>
      <div className="w-100">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center mb-2"
          >
            <span>{comment}</span>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => removeComment(index)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="form-control mb-3 mt-4"
        placeholder="Write a comment..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn grad-color" onClick={addComment}>
        Add Comment
      </button>
    </div>
  );
};

export default Comment;
