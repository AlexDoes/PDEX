import React from "react";
import { useState, useEffect } from "react";

function Dontlookhere() {
  const [data, setData] = useState(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Function to fetch data from the database
    const fetchData = async () => {
      try {
        setCounter((prevCount) => prevCount + 1);
        // Make the database fetch request here
        const response = await fetch("https://endflixv2.onrender.com/");
        const result = await response.json();
        // setData(Date().toLocaleString());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 3 minutes
    const intervalId = setInterval(fetchData, 10 * 60 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Don't look here</h1>
      <p>{data}</p>
      <p> {counter} fetches</p>
    </div>
  );
}

export default Dontlookhere;
