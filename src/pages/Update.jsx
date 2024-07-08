import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supaBaseClient";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [methid, setMethid] = useState("");
  const [rating, setRating] = useState("");
  const [error, seterror] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !methid || !rating) {
      seterror("Please fill all the fields");
      return;
    }

    const { data, error } = await supabase
      .from("helloworld")
      .update({ title, methid, rating })
      .eq("id", id);

    if (error) {
      seterror(error);
      console.log(error);
    }
    if (data) {
      seterror(null);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    fetchSmoothie();
  }, [id, navigate]);

  const fetchSmoothie = async () => {
    const { data, error } = await supabase
      .from("helloworld")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
      navigate("/");
    }
    if (data) {
      setTitle(data.title);
      setMethid(data.methid);
      setRating(data.rating);
      console.log(data);
    }
  };

  return (
    <div className="page update">
      <h2>Update - {id}</h2>
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

        <button type="submit">Update</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Update;
