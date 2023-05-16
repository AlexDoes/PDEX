import React from "react";
import { useState, useEffect } from "react";

const dontlookhere = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Function to fetch data from the database
    const fetchData = async () => {
      try {
        // Make the database fetch request here
        const response = await fetch("https://endflixv2.onrender.com/");
        const result = await response.json();
        // setData(Date().toLocaleString());
        console.log("Fetched")
        setData("a");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 3 minutes
    const intervalId = setInterval(fetchData, 1 * 60 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Don't look here</h1>
      <p>{data}</p>
    </div>
  );
};

export default dontlookhere;
