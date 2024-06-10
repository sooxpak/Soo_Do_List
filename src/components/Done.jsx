import DoneList from "./DoneList";

const Done = ({doneItems, setDoneItems}) => {

    const onDoneDelete = (targetId) => {
        const updatedItems = doneItems.filter((doneItem) => doneItem.id !== targetId);
        setDoneItems(updatedItems);
        localStorage.setItem("done", JSON.stringify(updatedItems));
    }

    return (
        <div className="box">
            <h6>Done 🎖️</h6>
            <DoneList doneItems={doneItems} onDoneDelete={onDoneDelete}/>
        </div>
    );
};

export default Done;
