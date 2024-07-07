import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supaBaseClient";

const Create = () => {
  const [title, setTitle] = useState("");
  const [methid, setMethid] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setformError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !methid || !rating) {
      setformError("Please fill in all fields");
      return;
    }

    setformError("");

    const formData = {
      title,
      methid,
      rating,
    };

    console.log("form Submitted: ", formData);

    const { data, error } = await supabase
      .from("helloworld")
      .insert([{ title, methid, rating }]);

    if (error) {
      console.log("Error: ", error);
      setformError(error);
    }

    if (data) {
      console.log("Data: ", data);
      setformError(null);
      navigate("/");
    }
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
            value={methid}
            onChange={(e) => setMethid(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Rating:</span>
          <input
            type="number"
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
