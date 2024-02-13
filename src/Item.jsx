function Item({ task, subject, id, deleteTask }) {
    return (
        <li className="flex gap-20 text-center items-center">
            <p>
                {task} | {subject}
            </p>
            <button
                onClick={deleteTask}
                className="bg-red-700 hover:bg-red-800 transition px-2 py-2 text-white rounded-xl"
            >
                Delete
            </button>
        </li>
    );
}

export default Item;
