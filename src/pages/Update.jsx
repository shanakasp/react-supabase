import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supaBaseClient";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [methid, setMethid] = useState("");
  const [rating, setRating] = useState("");

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
      navigate("/", { replace: true });
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
      <form>
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
        {/* {formError && <p className="error">{formError}</p>} */}
      </form>
    </div>
  );
};

export default Update;
