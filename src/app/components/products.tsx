"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID

interface Item {
  id: string;
  name: string;
}

export default function Products() {
  const [data, setData] = useState<Item[]>([]);

  // The useEffect dependency array ([]) ensures the data is only fetched once
  useEffect(() => {
    fetch('products.json')
      .then(response => response.json())
      .then(json => setData(json));
  }, []);
  
  // The current bug is that multiple "Spaghetti" items are being generated with the same key.
  // This can cause issues in React, as each item in a list should have a unique key.
  // The exercise mentions fixing any further bugs that occur when adding multiple "Spaghetti" items. 
  // This could imply two different interpretations in my opinion:
  // 1. The intended functionality is to allow multiple "Spaghetti" items with unique IDs each time
  //    (solving the bug by using UUID to prevent duplicate keys).
  // 2. Alternatively, if "Spaghetti" should only appear once in the list, we could prevent duplicate 
  //    entries by checking if "Spaghetti" is already present before adding it.
  
  const addSpaghetti = () => {
    // To avoid adding duplicate "Spaghetti" items, uncomment the following lines and comment lines 42 and 43:
    // const hasSpaghetti = data.some((item) => item.id === "5");
    //
    // if (!hasSpaghetti) {
    //   const newItem = { id: "5", name: "Spaghetti" };
    //   setData((prevData) => [...prevData, newItem]);
    // } else {
    //   alert("Spaghetti is already in the list!");
    // }
    //
    
    // By default, allow adding multiple "Spaghetti" items with unique IDs
    const newItem = { id: uuidv4(), name: "Spaghetti" };
    setData((prevData) => [...prevData, newItem]);
  };

  // Remove the last added item
  const removeLastItem = () => {
    setData(prevData => prevData.slice(0, -1));
  };

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={addSpaghetti}>Add Spaghetti</button>
      <button onClick={removeLastItem} disabled={data.length === 0}>Remove Last Item</button>
    </div>
  );
}
