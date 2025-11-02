import { useState } from "react";
import api from "./api/axios";

function Tasks({ tasks, users, reloadTasks, reloadUsers }) {
  const [title, setTitle] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [isDone, setIsDone] = useState(false);

  // Adding task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim() || !selectedUserId) return;

    try {
      await api.post("/tasks", {
        title,
        isDone: false,
        userId: parseInt(selectedUserId),
      });
      resetForm();
      reloadTasks();
      reloadUsers();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setSelectedUserId(task.userId);
    setIsDone(task.isDone);
  };

  // Save edited task
  const handleEditTask = async (e) => {
    e.preventDefault();
    if (!editingTask) return;

    try {
      await api.put(`/tasks/${editingTask.id}`, {
        title,
        isDone,
        userId: parseInt(selectedUserId),
      });
      setEditingTask(null);
      setTitle("");
      setSelectedUserId("");
      setIsDone(false);
      reloadTasks();
      reloadUsers();
    } catch (err) {
      console.error("Error editing task:", err);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      reloadTasks();
      reloadUsers();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Cancel editing
  const cancelEdit = () => resetForm();

  // Reset form and editing states
  const resetForm = () => {
    setEditingTask(null);
    setTitle("");
    setSelectedUserId("");
    setIsDone(false);
  };

  return (
    <div>
      <h2>{editingTask ? "Edit Task" : "Create Task"}</h2>
      <form onSubmit={editingTask ? handleEditTask : handleAddTask}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label style={{ marginLeft: "10px" }}>
          Done:
          <input
            type="checkbox"
            checked={isDone}
            onChange={(e) => setIsDone(e.target.checked)}
          />
        </label>

        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="">Select User</option>
          {users?.map((u) => (
            <option key={u.id} value={u.id}>
              {u.email}
            </option>
          ))}
        </select>

        {editingTask ? (
          <>
            <button type="submit" style={{ marginLeft: "10px" }}>
              Save
            </button>
            <button type="button" onClick={cancelEdit} style={{ marginLeft: "5px" }}>
              Cancel
            </button>
          </>
        ) : (
          <button type="submit" style={{ marginLeft: "10px" }}>
            Add Task
          </button>
        )}
      </form>

      <h2>Tasks</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.isDone ? "✅ Done" : "❌ Not Done"}</td>
              <td>{task.user?.email || "No user"}</td>
              <td>
                <button onClick={() => startEditing(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)} style={{ marginLeft: "5px" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Tasks;
