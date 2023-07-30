export default function Item({ item, onDelete, onToggle }) {
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
