export default function App() {
  const [items, setItem] = useState([]);

  function itemHandler(item) {
    setItem((items) => [...items, item]);
    console.log(items);
  }
  function deletItem(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={itemHandler} />
      <PackingList
        items={items}
        onDeleletIteme={deletItem}
        onToggle={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1>Far Away✈</h1>
    </div>
  );
}

/// Form component
function Form({ onAddItem }) {
  // Creating state for our input

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  /// Creating our onSubmitHanler

  // OnsumitHanlder
  function onSubmitHandler(e) {
    e.preventDefault();
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={onSubmitHandler}>
      <h3>What do you need for trip ❓❓ </h3>

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
        placeholder="testin my knolege"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

// PackingList component
function PackingList({ items, onDeleletIteme, onToggle }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleletIteme={onDeleletIteme}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
}

// Item component
function Item({ item, onDeleletIteme, onToggle }) {
  //aplying conditional styling
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onDeleletIteme(item.id)}>❌</button>
    </li>
  );
}
// Footer component
function Stats() {
  return (
    <footer className="stats">
      <em>
        You have X intems in your list , and you have already packed X (X%)
      </em>
    </footer>
  );
}
