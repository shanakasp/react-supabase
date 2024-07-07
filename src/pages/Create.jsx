import { useState } from "react";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setformError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setformError("Please fill in all fields");
      return;
    }

    setformError("");

    const formData = {
      title,
      method,
      rating,
    };

    console.log("form Submitted: ", formData);
  };

  return (
    <div className="page create">
      <h2>Create</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Method:</span>
          <input
            type="text"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Rating:</span>
          <input
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </label>

        <button type="submit">Submit</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
