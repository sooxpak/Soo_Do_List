import React from "react";
import {useState} from "react";
import TinyConfirmModalModal from "./TinyConfirmModal";

const TinyItem = ({item, onDelete, setDoneItems, updateItemColor}) => {
    const [isTinyDone, setIsTinyDone] = useState(false);
    const [isTinyConfirmModalOpen, setIsTinyConfirmModalOpen] = useState(false);
    const [isTinyHover, setIsTinyHover] = useState(false);

    const todayDate = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    const handleTaskItemClick = () => {
        setIsTinyConfirmModalOpen(true);
    };

    const handleTinyConfirmClick = () => {
        setIsTinyDone((toggle) => !toggle);

        const prevTaskDoneItems = JSON.parse(localStorage.getItem("done")) || [];
        const updatedTaskDoneItems = [...prevTaskDoneItems, item];
        localStorage.setItem("done", JSON.stringify(updatedTaskDoneItems));

        onDelete(item.id);
        setDoneItems(updatedTaskDoneItems);

        setIsTinyConfirmModalOpen(false);
    }

    const handleTinycancelClick = () => {
        setIsTinyConfirmModalOpen(false);
    }

    const handleColorClick = (color) => {
        const workType = document.querySelector(`#tiny-${item.id} .work_type`);
        if (workType) {
            workType.style.backgroundColor = color;
        }
        updateItemColor(item.id, color);
    };

    const handleMouseOver = () => {
        setIsTinyHover(true);
    };

    const handleMouseOut = () => {
        setIsTinyHover(false);
    };

    return (
        <div id={`tiny-${item.id}`} className={`item tiny ${isTinyHover ? "hover" : ""}`}>
            {isTinyConfirmModalOpen ? (
                <>
                    <div className="color_box">
                        <button className="red" onClick={() => handleColorClick('#f8b8ad')}></button>
                        <button className="blue" onClick={() => handleColorClick('#a5d4ee')}></button>
                        <button className="pink" onClick={() => handleColorClick('#dcb6f2')}></button>
                    </div>
                    <div className="work_type">{item.type}</div>
                    <div className="click_area">
                        <div className="work_content">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                        <div className="work_date">{todayDate()}</div>
                    </div>
                    <TinyConfirmModalModal handleTaskConfirmClick={handleTinyConfirmClick}
                                           handleTaskcancelClick={handleTinycancelClick}/>
                </>

            ) : (
                <>
                    <div className="color_box">
                        <button className="red" onClick={() => handleColorClick('#f8b8ad')}></button>
                        <button className="blue" onClick={() => handleColorClick('#a5d4ee')}></button>
                        <button className="pink" onClick={() => handleColorClick('#dcb6f2')}></button>
                    </div>
                    <div className="work_type">{item.type}</div>
                    <div className={`click_area ${isTinyDone ? "done" : ""}`}
                         onClick={handleTaskItemClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        <div className="work_content">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                        <div className="work_date">{todayDate()}</div>
                    </div>
                </>
            )}
        </div>
    )
}

export default TinyItem;