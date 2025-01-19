import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [data, setData] = useState(null); // Initialize as null
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [count, setCount] = useState(0); // Initialize count as 0

  const cleardata = () => {
    setData(null); // Clear the data state
    setTitle("");
    setBody(""); // Clear the title state
    setCount(0);
  };

  useEffect(() => {
    if (data === null) {
      covid();
    }
  }, [data]); // Ensures covid is called only when data is null

  const covid = async () => {
    const url = "https://jsonplaceholder.typicode.com/posts";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json(); // Parse the response as JSON
      if (Array.isArray(result)) {
        const randomIndex = Math.floor(Math.random() * result.length); // Get a random index
        console.log(randomIndex);
        setData(result[randomIndex].id);
        setTitle(result[randomIndex].title); // Set the title to a random post's title
        setBody(result[randomIndex].body);
        console.log(result[randomIndex], "random");
        setCount((c) => c + 1); // Increment count
      } else {
        console.error("Response is not an array:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <h1>
        {data} {title}
      </h1>
      <h2>{body}</h2>
      <button onClick={covid}>Fetch Data</button>
      <button onClick={cleardata}>Clear Data</button>
      <p>
        You have read <strong>{count}</strong> piece of advice.
      </p>
    </div>
  );
}
