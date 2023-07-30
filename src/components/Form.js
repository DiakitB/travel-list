import { useState } from "react";

export default function Form({ onAddItem }) {
  //Creating our description state
  const [description, setDescription] = useState("");

  // Creating our Quantity state
  const [quantity, setQuantity] = useState(1);

  //Creating our item state
  // const [itemsList, setItems] = useState([]);
  // ItemsHanlder function

  // function handlerItem(item) {
  //   setItems((itemsList) => [...itemsList, item]);
  // }
  // onSubmitHandler
  function onSubmitHandler(e) {
    e.preventDefault();
    const newItem = { id: Date.now(), description, quantity, packed: false };
    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={onSubmitHandler}>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Math.abs(e.target.value))}
      >
        {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="add items"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
