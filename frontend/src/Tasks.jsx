//import { useEffect, useState } from 'react';
//import api from "./api/axios"

function Tasks({ tasks }) {

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} {task.isDone ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
