import { useEffect, useState } from "react";
import Card from "../component/Card";
import supabase from "../config/supaBaseClient";
const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [data, setData] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("helloworld")
      .select()
      .order(orderBy, { ascending: false });

    if (error) {
      setFetchError("Could not fetch the data");
      setData(null);
      console.log(error);
    } else {
      setData(data);
      console.log(data);
      setFetchError(null);
    }
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}

      {data && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy("created_at")}>
              Time Created
            </button>
            <button onClick={() => setOrderBy("title")}> Title</button>
            <button onClick={() => setOrderBy("Rating")}>Rating</button>
            {orderBy}
          </div>
          <div className="smoothie-grid">
            {data.map((item) => (
              <Card key={item.id} smoothie={item} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
