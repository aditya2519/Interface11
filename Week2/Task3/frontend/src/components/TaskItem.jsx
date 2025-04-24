const TaskItem = ({ task, onDelete, fetchTasks }) => {
    const deleteTask = async () => {
      try {
        await onDelete(task.id);
        if (fetchTasks) fetchTasks(); 
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    };
  
    return (
      <div className="task-item">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <button onClick={deleteTask}>Delete</button>
      </div>
    );
  };
  
  export default TaskItem;
  