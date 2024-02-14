function Item({ task, subject, id, deleteTask }) {
    return (
        <li className="flex gap-10 text-center items-center px-5 py-2 bg-pizazz rounded-xl text-black select-none font-bold">
            <p>
                {task} | {subject}
            </p>
            <button
                onDoubleClick={deleteTask}
                className="bg-red-700 hover:bg-red-800 transition px-2 py-2 text-white rounded-xl"
            >
                &#128465;
            </button>
        </li>
    );
}

export default Item;
