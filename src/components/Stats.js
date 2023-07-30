export default function Stats({ itemsList }) {
  if (!itemsList.length)
    return (
      <p className="stats">
        <em>Start adding som items to your packing list 🔹🔷🔹</em>
      </p>
    );
  const numItem = itemsList.length;
  const itemsPakced = itemsList.filter((item) => item.packed).length;
  const percentage = Math.round((itemsPakced / numItem) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? `You got everting! Ready to go  ✈`
          : `You have ${numItem} intems in your list , and you have already packed
        ${itemsPakced} ${
              itemsPakced <= 1 ? "item" : "items"
            }  which is (${percentage}%)`}
      </em>
    </footer>
  );
}
