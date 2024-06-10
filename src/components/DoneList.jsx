import DoneItem from "./DoneItem";

const DoneList = ({doneItems, onDoneDelete}) => {
    return (
        <div className="list">
            {doneItems ? (
                doneItems.map((doneItem, id) => (
                    <DoneItem key={id} doneItem={doneItem} onDoneDelete={onDoneDelete}/>
                ))
            ) : (
                <></>
            )}
        </div>
    )
}

export default DoneList;