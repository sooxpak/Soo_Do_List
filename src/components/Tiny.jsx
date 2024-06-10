import {useEffect, useState} from "react";
import TinyList from "./TinyList";
import TinyAddModal from "./TinyAddModal";

const Tiny = ({setDoneItems}) => {

    const [IsTinyAddModalOpen, setIsTinyAddModalOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("0");
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
        setIsTinyAddModalOpen(true);
        window.addEventListener('keydown', handleKeyDown);
    }

    const handleModalClose = () => {
        setIsTinyAddModalOpen(false);
        window.removeEventListener('keydown', handleKeyDown);
    }

    const todayDate = () => {
        let date = new Date();
        return date.toLocaleDateString();
    }

    const handleTodayDate = () => {
        setDate(todayDate());
    }

    const onCreate = (type, title, description, date) => {
        const newItem = {
            id: itemIdCounter +1,
            type: type,
            title: title,
            description: description,
            date: date,
        }
        setItemIdCounter(itemIdCounter + 1);

        const prevItems = JSON.parse(localStorage.getItem("tiny")) || [];
        const updatedItems = [...prevItems, newItem];
        localStorage.setItem("tiny", JSON.stringify(updatedItems));
        setItems(updatedItems);
        alert('등록되었습니다');

        setIsTinyAddModalOpen(false);
    }

    const onDelete = (targetId) => {
        const updatedItems = items.filter((item) => item.id !== targetId);
        setItems(updatedItems);
        localStorage.setItem("tiny", JSON.stringify(updatedItems));
    }

    const updateItemColor = (id, color) => {
        const updatedItems = items.map((item) =>
            item.id === id ? { ...item, color } : item
        );
        setItems(updatedItems);
        localStorage.setItem("tiny", JSON.stringify(updatedItems));
    };

    useEffect(() => {
        const localData = localStorage.getItem("tiny");
        if (localData) {
            const parsedData = JSON.parse(localData);
            setItems(parsedData);

            if (parsedData.length > 0) {
                setItemIdCounter(parsedData[parsedData.length - 1].id);
            }
        }
    }, [])

    return (
        <div className="box">
            {IsTinyAddModalOpen ? (
                <>
                    <TinyAddModal handleModalClose={handleModalClose} onCreate={onCreate} type={type} setType={setType} title={title}
                                  setTitle={setTitle} description={description} setDescription={setDescription} handleTodayDate={handleTodayDate}/>
                    <div className="title_wrap">
                        <h6>Tiny 💡</h6>
                        <button className="modal_open" onClick={handleModalOpen}></button>
                    </div>
                    <TinyList items={items} onDelete={onDelete} setDoneItems={setDoneItems} updateItemColor={updateItemColor}/>
                </>
            ) : (
                <>
                    <div className="title_wrap">
                        <h6>Tiny 💡</h6>
                        <button className="modal_open" onClick={handleModalOpen}></button>
                    </div>
                    <TinyList items={items} onDelete={onDelete} setDoneItems={setDoneItems} updateItemColor={updateItemColor}/>
                </>
            )}
        </div>
    )
}

export default Tiny;