import React, {useState} from "react";
import DoneConfirmModal from "./DoneConfirmModal";

const DoneItem = ({onDoneDelete, doneItem}) => {

    const [isDoneConfirmModalOpen, setIsDoneConfirmModalOpen] = useState(false);

    const handleDoneItemClick = () => {
        setIsDoneConfirmModalOpen(true);
    }

    const handleDoneConfirmClick = () => {
        onDoneDelete(doneItem.id);
        setIsDoneConfirmModalOpen(false);
    }

    const handleDoneCancelClick = () => {
        setIsDoneConfirmModalOpen(false);
    }

    return (
        <div className="item done">
            {isDoneConfirmModalOpen ? (
                <>
                    <div className="work_type">{doneItem.type}</div>
                    <div className="click_area" onClick={handleDoneItemClick}>
                        <div className="work_content">
                            <h3>{doneItem.title}</h3>
                            <p>{doneItem.description}</p>
                        </div>
                        <div className="work_date">{doneItem.date}</div>
                    </div>
                    <DoneConfirmModal handleDoneConfirmClick={handleDoneConfirmClick}  handleDoneCancelClick={handleDoneCancelClick}/>
                </>
            ) : (
                <>
                    <div className="work_type">{doneItem.type}</div>
                    <div className="click_area" onClick={handleDoneItemClick}>
                        <div className="work_content">
                            <h3>{doneItem.title}</h3>
                            <p>{doneItem.description}</p>
                        </div>
                        <div className="work_date">{doneItem.date}</div>
                    </div>
                </>
            )}
        </div>
    )
}

export default DoneItem;