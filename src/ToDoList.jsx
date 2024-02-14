import { useEffect, useState } from "react";
import Item from "./Item.jsx";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBF5fqxiZYIWDAybSs6qckXgHedLBjQpKM",
    authDomain: "work-reminder-6907f.firebaseapp.com",
    projectId: "work-reminder-6907f",
    storageBucket: "work-reminder-6907f.appspot.com",
    messagingSenderId: "897809392355",
    appId: "1:897809392355:web:52091862b5b27faff11bd6",
    databaseURL:
        "https://work-reminder-6907f-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
const database = getDatabase(app);
const workReminderDB = ref(database, "workReminder");

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
    }

    function addTask() {
        if (newTask.task && newTask.subject) {
            push(workReminderDB, newTask);
            setNewTask({
                task: "",
                subject: "",
            });
        }
    }

    function deleteTask(id) {
        let exactLocationOfItemInDB = ref(database, `workReminder/${id}`);
        remove(exactLocationOfItemInDB);
    }

    useEffect(() => {
        onValue(workReminderDB, function (snapshot) {
            if (snapshot.exists()) {
                let keysArray = Object.entries(snapshot.val());
                let updatedTasks = []; // Create a new array to hold updated tasks
                for (let i = 0; i < keysArray.length; i++) {
                    const curr = keysArray[i][1];
                    const id = keysArray[i][0];
                    const obj = {
                        id,
                        ...curr,
                    };
                    updatedTasks.push(obj);
                }
                setTasks(updatedTasks);
            } else {
                setTasks([]);
            }
        });
    }, []);

    const items = tasks.map((task, index) => (
        <Item
            task={task.task}
            subject={task.subject}
            key={index}
            deleteTask={() => deleteTask(task.id)}
        />
    ));

    return (
        <div className="flex flex-col h-screen w-screen justify-center items-center gap-10 text-white text-xl">
            <h1 className="font-bold text-5xl rounded-xl">Work Reminder</h1>
            <div className="flex flex-col gap-5">
                <input
                    type="text"
                    value={newTask.task}
                    onChange={handleInputChange}
                    name="task"
                    className="border-2 border-black px-5 py-2 rounded-xl text-black"
                    placeholder="Task"
                />
                <input
                    type="text"
                    value={newTask.subject}
                    onChange={handleInputChange}
                    name="subject"
                    className="border-2 border-black px-5 py-2 rounded-xl text-black"
                    placeholder="Subject"
                />
                <button
                    onClick={addTask}
                    className="rounded-xl px-2 py-2 bg-darthmouth_green transition hover:bg-opacity-70 duration-500"
                >
                    Add
                </button>
            </div>
            <div>
                <ul className="flex flex-wrap gap-5 items-center justify-center">
                    {items}
                </ul>
            </div>
        </div>
    );
}

export default ToDoList;
