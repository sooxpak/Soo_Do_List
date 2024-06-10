import {useEffect, useState} from "react";
import TaskList from "./TaskList";
import TaskAddModal from "./TaskAddModal";

const Task = ({setDoneItems}) => {

    const [isTaskAddModalOpen, setIsTaskAddModalOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [itemIdCounter, setItemIdCounter] = useState(0);

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            handleModalClose();
            setType("");
            setTitle("");
            setDescription("");
        }
    };
    const handleModalOpen = () => {
        setIsTaskAddModalOpen(true);
        window.addEventListener('keydown', handleKeyDown);
    }

    const handleModalClose = () => {
        setIsTaskAddModalOpen(false);
        window.removeEventListener('keydown', handleKeyDown);
    }

    const todayDate = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    const onCreate = (type, title, description,) => {
        const newItem = {
            id: itemIdCounter +1,
            type: type,
            title: title,
            description: description,
            color: "",
            date: todayDate(),
        }
        setItemIdCounter(itemIdCounter + 1);

        const prevItems = JSON.parse(localStorage.getItem("task")) || [];
        const updatedItems = [...prevItems, newItem];
        localStorage.setItem("task", JSON.stringify(updatedItems));
        setItems(updatedItems);
        alert('등록되었습니다');

        setIsTaskAddModalOpen(false);
    }

    const onDelete = (targetId) => {
        const updatedItems = items.filter((item) => item.id !== targetId);
        setItems(updatedItems);
        localStorage.setItem("task", JSON.stringify(updatedItems));
    }

    const updateItemColor = (id, color) => {
        const updatedItems = items.map((item) =>
            item.id === id ? { ...item, color } : item
        );
        setItems(updatedItems);
        localStorage.setItem("task", JSON.stringify(updatedItems));
    };

    useEffect(() => {
        const localData = localStorage.getItem("task");
        if (localData) {
            const parsedData = JSON.parse(localData);
            setItems(parsedData);

            if (parsedData.length > 0) {
                setItemIdCounter(parsedData[parsedData.length - 1].id);
            }
        }
    }, []);

    return (
        <div className="box">
            {isTaskAddModalOpen ? (
                <>
                    <TaskAddModal handleModalClose={handleModalClose} onCreate={onCreate} type={type} setType={setType} title={title}
                                  setTitle={setTitle} description={description} setDescription={setDescription}/>
                    <div className="title_wrap">
                        <h6>Task 💡</h6>
                        <button className="modal_open" onClick={handleModalOpen}></button>
                    </div>
                    <TaskList items={items} onDelete={onDelete} setDoneItems={setDoneItems} updateItemColor={updateItemColor}/>
                </>
            ) : (
                <>
                    <div className="title_wrap">
                        <h6>Task 💡</h6>
                        <button className="modal_open" onClick={handleModalOpen}></button>
                    </div>
                    <TaskList items={items} onDelete={onDelete} setDoneItems={setDoneItems} updateItemColor={updateItemColor}/>
                </>
            )}
        </div>
    )
}

export default Task;