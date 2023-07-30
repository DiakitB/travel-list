//////

import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
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

  /// clearing the state
  ////

  function clearItemList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items in the list?"
    );
    if (confirmed) setItems([]);
  }

  //// Return statement
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handlerItem} />
      <PackingList
        itemsList={itemsList}
        onDelete={deleteItem}
        onToggle={handleToggleItem}
        onClear={clearItemList}
      />
      <Stats itemsList={itemsList} />
    </div>
  );
}

// Form implementation

// PackingList getting our Data and loop over it
////
