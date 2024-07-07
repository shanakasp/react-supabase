import { useEffect, useState } from "react";
import Card from "../component/Card";
import supabase from "../config/supaBaseClient";
const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from("helloworld").select("*");

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

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}

      {data && (
        <div className="smoothies">
          <div className="smoothie-grid">
            {data.map((item) => (
              <Card key={item.id} smoothie={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
