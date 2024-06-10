import React, {useState, useEffect} from "react";
import TaskConfirmModalModal from "./TaskConfirmModal";

const TaskItem = ({item, onDelete, setDoneItems, updateItemColor}) => {
    const [isTaskDone, setIsTaskDone] = useState(false);
    const [isTaskConfirmModalOpen, setIsTaskConfirmModalOpen] = useState(false);
    const [isTinyHover, setIsTinyHover] = useState(false);

    useEffect(() => {
        const savedColor = item.color;
        if (savedColor) {
            const workType = document.querySelector(`#task-${item.id} .work_type`);
            if (workType) {
                workType.style.backgroundColor = savedColor;
            }
        }
    }, [item.color, item.id]);


    const handleTaskItemClick = () => {
        setIsTaskConfirmModalOpen(true);
    };

    const handleTaskConfirmClick = () => {
        setIsTaskDone((toggle) => !toggle);

        const prevTaskDoneItems = JSON.parse(localStorage.getItem("done")) || [];
        const updatedTaskDoneItems = [...prevTaskDoneItems, item];
        localStorage.setItem("done", JSON.stringify(updatedTaskDoneItems));

        onDelete(item.id);
        setDoneItems(updatedTaskDoneItems);

        setIsTaskConfirmModalOpen(false);
    }

    const handleTaskcancelClick = () => {
        setIsTaskConfirmModalOpen(false);
    }

    const handleColorClick = (color) => {
        const workType = document.querySelector(`#task-${item.id} .work_type`);
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
        <div id={`task-${item.id}`} className={`item task ${isTinyHover ? "hover" : ""}`}>
            {isTaskConfirmModalOpen ? (
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
                        <div className="work_date">{item.date}</div>
                    </div>
                    <TaskConfirmModalModal handleTaskConfirmClick={handleTaskConfirmClick}
                                           handleTaskcancelClick={handleTaskcancelClick}/>
                </>
            ) : (
                <>
                    <div className="color_box">
                        <button className="red" onClick={() => handleColorClick('#f8b8ad')}></button>
                        <button className="blue" onClick={() => handleColorClick('#a5d4ee')}></button>
                        <button className="pink" onClick={() => handleColorClick('#dcb6f2')}></button>
                    </div>
                    <div className="work_type">{item.type}</div>
                    <div className={`click_area ${isTaskDone ? "done" : ""}`}
                         onClick={handleTaskItemClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        <div className="work_content">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                        <div className="work_date">{item.date}</div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskItem;
