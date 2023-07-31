import { useState } from "react";

//////
// const initialList = [
//   { id: 1, description: "passport", quantity: 1, packed: false },
//   { id: 2, description: "underwears", quantity: 2, packed: true },
//   { id: 3, description: "T-shirt", quantity: 8, packed: false },
//   { id: 4, description: "jeans", quantity: 5, packed: false },
// ];
export default function App() {
  const [itemArray, setItem] = useState([]);
  const numItem = itemArray.length;
  console.log(numItem);

  function cleareList() {
    setItem([]);
  }
  //DeleteHandler
  function deleteHandler(id) {
    setItem((itemArray) => itemArray.filter((item) => item.id !== id));
  }

  // createItemhandler
  function createANewItem(newItem) {
    setItem((itemArray) => [...itemArray, newItem]);
  }

  ///ToggleHandler

  function toggleHandler(id) {
    setItem((itemArray) =>
      itemArray.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onCreatItem={createANewItem} />
      <PackingList
        itemArray={itemArray}
        onDelete={deleteHandler}
        onToggle={toggleHandler}
        cleareList={cleareList}
      />
      <Stats itemArray={itemArray} />
    </div>
  );
}

//Logo component
function Logo() {
  return (
    <div>
      <h1>Business Trip ✈ </h1>
    </div>
  );
}
// Form component

////
function Form({ onCreatItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // onsubmitHandler
  function submitHandler(e) {
    e.preventDefault();

    // create a new item using our controlled elements
    const newItem = { description, quantity, id: Date.now(), packed: false };
    console.log(newItem);
    onCreatItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={submitHandler}>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Math.abs(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Add your add here"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

///
///PackingList Component

function PackingList({ itemArray, onDelete, onToggle, cleareList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItem;
  if (sortBy === "input") sortedItem = itemArray;
  console.log(sortedItem);
  if (sortBy === "description")
    sortedItem = itemArray
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItem = itemArray
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value={"input"}>Sort By user input</option>
          <option value={"description"}>Sort By description</option>
          <option value={"packed"}>Sort By packed status</option>
        </select>{" "}
        <button onClick={cleareList}>Clear List</button>
      </div>
    </div>
  );
}

/// Item component

function Item({ item, onDelete, onToggle }) {
  return (
    <li>
      <p>
        <input
          type="checkbox"
          value={item.packe}
          onChange={(e) => onToggle(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.description} {item.quantity}
        </span>
      </p>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}
// Stats component

function Stats({ itemArray }) {
  const numItem = itemArray.length;
  const itemsPacked = itemArray.filter((item) => item.packed).length;
  const percentage = Math.round((itemsPacked / numItem) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You are ready to go ✈"
          : `You have ${numItem} in your list, and you have already packed: ${itemsPacked} ${
              itemsPacked <= 1 ? "item" : "items"
            } which is : ${percentage}%`}
      </em>
    </footer>
  );
}
