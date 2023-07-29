//////

import { useState } from "react";

export default function App() {
  //Uplifting Items state
  const [itemsList, setItems] = useState([]);
  function handlerItem(item) {
    setItems((itemsList) => [...itemsList, item]);
    console.log();
  }
  // Delete function

  function deleteItem(id) {
    setItems((itemsList) => itemsList.filter((item) => item.id !== id));
  }

  //Updating our state
  function handleToggleItem(id) {
    setItems((itemsList) =>
      itemsList.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  ///
  ////

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handlerItem} />
      <PackingList
        itemsList={itemsList}
        onDelete={deleteItem}
        onToggle={handleToggleItem}
      />
      <Stats itemsList={itemsList} />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1>Bisiness Trip ✈</h1>
    </div>
  );
}
// Form implementation
function Form({ onAddItem }) {
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
// PackingList getting our Data and loop over it
////
function PackingList({ itemsList, onDelete, onToggle }) {
  return (
    <div className="list">
      <ul>
        {itemsList.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onDelete, onToggle }) {
  return (
    <li>
      <p>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onToggle(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.description} {item.quantity}
        </span>
      </p>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}
function Stats({ itemsList }) {
  const numItem = itemsList.length;
  return (
    <footer className="stats">
      <em>
        You have {numItem} intems in your list , and you have already packed X
        (X%)
      </em>
    </footer>
  );
}
