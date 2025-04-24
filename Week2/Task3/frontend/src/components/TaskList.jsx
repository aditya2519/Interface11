import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/tasks/";

const TaskList = ({ tasks, fetchTasks }) => {
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
    }
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? <p>No tasks available.</p> : null}
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <div className="task-info">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Assigned To:</strong> {task.assigned_to}</p>
            <p><strong>Due Date:</strong> {task.due_date}</p>
            <p><strong>Status:</strong> {task.status}</p>
          </div>
          <div className="task-actions">
            <button className="delete" onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
