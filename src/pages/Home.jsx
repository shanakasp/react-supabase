import { useEffect, useState } from "react";
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
    }

    if (data) {
      setData(data);
      console.log(data);
      setFetchError(null);
    }
  };

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}

      {data && data.map((item) => <p key={item.id}>{item.title}</p>)}
    </div>
  );
};

export default Home;
