import { useState } from "react";
import axios from "axios";

const TaskForm = ({ fetchTasks }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("pending");

    const API_URL = "http://127.0.0.1:8000/api/tasks/";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!assignedTo.trim()) {
            alert("Assigned To cannot be empty!");
            return;
        }

        const formattedTask = {
            title,
            description,
            assigned_to: assignedTo,
            due_date: dueDate,
            status, 
        };

        console.log("Submitting Task:", formattedTask);

        try {
            await axios.post(API_URL, formattedTask);
            fetchTasks();
            setTitle("");
            setDescription("");
            setAssignedTo("");
            setDueDate("");
            setStatus("pending");
        } catch (error) {
            console.error("Error adding task:", error.response?.data || error.message);
        }
    };

    return (
        <div className="container">
            <h2>Add Task</h2>
            <form className="task-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Assigned To" 
                    value={assignedTo} 
                    onChange={(e) => setAssignedTo(e.target.value)} 
                    required 
                />
                <input 
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                    required 
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button type="submit">ADD</button>
            </form>
        </div>
    );
};

export default TaskForm;
