import React from "react";
import { TiEdit, TiTrash } from "react-icons/ti";

function WorkoutsTableRow({ workout, onEdit, onDelete }) {
  return (
    <tr>
      <td>{workout.name}</td>
      <td>{workout.reps}</td>
      <td>{workout.weight}</td>
      <td>{workout.unit}</td>
      <td>{workout.date.toLocaleString("en-US").slice(0, 10)}</td>
      <td>
        <TiEdit className="icon" onClick={() => onEdit(workout)} />
      </td>
      <td>
        <TiTrash className="icon" onClick={() => onDelete(workout._id)} />
      </td>
    </tr>
  );
}

export default WorkoutsTableRow;
