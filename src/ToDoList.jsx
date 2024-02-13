import { useState } from "react";
import Item from "./Item.jsx";
function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        task: "",
        subject: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setNewTask((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(newTask);
    }

    function addTask() {
        setTasks([...tasks, newTask]);

        setNewTask({
            task: "",
            subject: "",
        });
    }

    function deleteTask(index) {
        console.log("commencing delete");
        setTasks((prev) => prev.filter((_, i) => i !== index));
    }
    const items = tasks.map((task, index) => (
        <Item
            task={task.task}
            subject={task.subject}
            key={index}
            deleteTask={() => deleteTask(index)}
        />
    ));
    return (
        <div className="flex flex-col h-screen w-screen justify-center items-center gap-10">
            <h1 className="font-bold text-2xl rounded-xl">To Do List</h1>
            <div className="flex flex-col gap-10">
                <input
                    type="text"
                    value={newTask.task}
                    onChange={handleInputChange}
                    name="task"
                    className="border-2 border-black px-5 py-2 rounded-xl"
                    placeholder="Task"
                />
                <input
                    type="text"
                    value={newTask.subject}
                    onChange={handleInputChange}
                    name="subject"
                    className="border-2 border-black px-5 py-2 rounded-xl"
                    placeholder="Subject"
                />
                <button
                    onClick={addTask}
                    className="border-2 border-black rounded-xl px-2 py-2"
                >
                    Add
                </button>
            </div>
            <div>
                <ul>{items}</ul>
            </div>
        </div>
    );
}

export default ToDoList;
